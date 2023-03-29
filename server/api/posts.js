const router = require("express").Router();
const {
  models: { User, Comment, Post },
} = require("../db");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//get all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment }, { model: User }],
      order: [["updatedAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

//upload image
router.post("/:id", upload.single("myImage"), async (req, res, next) => {
  try {
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = "no-image-icon.png";
    }
    const newPost = await Post.create({
      ...req.body,
      userId: req.params.id,
      imageUrl: imageName,
    });
    res.json(await Post.findByPk(newPost.id, { include: [User] }));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", upload.single("myImage"), async (req, res, next) => {
  try {
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = req.body.imageUrl;
    }
    await Post.update(
      {
        ...req.body,
        imageUrl: imageName,
      },
      { where: { id: req.params.id } }
    );
    res.json(
      await Post.findByPk(req.params.id, {
        include: [{ model: Comment }, { model: User }],
      })
    );
  } catch (error) {
    next(error);
  }
});

//get posts for a certain user
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }, { model: User }],
      order: [["updatedAt", "DESC"]],
    });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

//delete a post
router.delete("/:id", async (req, res, next) => {
  try {
    const target = await Post.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//add like
router.post("/addlikes/:id", async (req, res, next) => {
  try {
    let post = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }, { model: User }],
      order: [["updatedAt", "DESC"]],
    });
    if (!post.likes.includes(req.body.id)) {
      post.likes.push(req.body.id);
    }
    await Post.update({ likes: post.likes }, { where: { id: post.id } });
    const newPost = await Post.findByPk(post.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
