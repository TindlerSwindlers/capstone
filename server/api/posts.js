const router = require('express').Router();
const {
  models: { User, Comment, Post },
} = require('../db');
module.exports = router;
const multer = require('multer');
const uuidv4 = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment }, { model: User }],
      order: [['updatedAt', 'DESC']],
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/:id', upload.single('myImage'), async (req, res, next) => {
  try {
    let imageName = '';
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = 'no-image-icon.png';
    }
    const newPost = await Post.create({
      ...req.body,
      userId: req.params.id,
      imageUrl: '../../' + imageName,
    });
    res.json(newPost);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await Post.update(req.body, { where: { id: req.params.id } });
    res.json(
      await Post.findByPk(req.params.id, {
        include: [User],
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.params.id },
      include: [{ model: Comment }, { model: User }],
      order: [['updatedAt', 'DESC']],
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const target = await Post.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
