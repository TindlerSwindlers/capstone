const router = require('express').Router();
const {
  models: { User, Comment },
} = require('../db');

//get all comments by user id
router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [User],
      order: [['updatedAt', 'DESC']],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

//create a new comment
router.post('/:postid/:userid', async (req, res, next) => {
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

//delete a comment
router.delete('/:id', async (req, res, next) => {
  try {
    const target = await Comment.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    console.log('Error deleting a comment from API');
    next(ex);
  }
});

module.exports = router;
