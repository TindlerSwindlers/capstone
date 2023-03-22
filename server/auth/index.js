const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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

router.post('/login', upload.single('myImage'), async (req, res, next) => {
  try {
    console.log(req.body);
    res.send({ token: await User.authenticate({ ...req.body }) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', upload.single('myImage'), async (req, res, next) => {
  try {
    let imageName = '';
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = 'no-image-icon.png';
    }
    const hobbies = req.body.hobbies.split(',');
    const user = await User.create({
      ...req.body,
      hobbies: hobbies,
      imageUrl: imageName,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.put('/me', upload.single('myImage'), async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let imageName = '';
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = req.body.imageUrl;
    }
    const hobbies = req.body.hobbies.split(',');
    await user.update({
      ...req.body,
      hobbies: hobbies,
      imageUrl: imageName,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
