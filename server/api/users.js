const router = require("express").Router();
const {
  models: { User, Comment, Post },
} = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Post }, { model: Comment }],
      attributes: ["id", "username", "interest"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

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
    const user = await User.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
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
