const router = require("express").Router();
const {
  models: { User, Comment, Post },
} = require("../db");


router.get("/:id", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.id },
      include: [User],
      order: [["updatedAt", "DESC"]],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/:postid/:userid", async (req, res, next) => {
  try {
    const newEntry = await Comment.create({
      ...req.body,
      userId: req.params.userid,
      postId: req.params.postid,
    });
    const newComment = await Comment.findByPk(newEntry.id, { include: [User] });
    res.json(newComment);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const target = await Comment.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    console.log("Error deleting a comment from API");
    next(ex);
  }
});

module.exports = router;