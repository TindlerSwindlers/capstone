const router = require("express").Router();
const {
  models: { User, Comment, Post },
} = require("../db");
const { Op } = require("sequelize");

//get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
      attributes: ["id", "username", "interest", "imageUrl"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get a certain user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Post }, { model: Comment }],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/recommended/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Post }, { model: Comment }],
    });
    console.log("USEEEER", user.interest);
    const users = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
      where: {
        interest: {
          [Op.ne]: user.interest,
        },
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const target = await User.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
