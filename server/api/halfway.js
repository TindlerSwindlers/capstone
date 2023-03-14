const router = require("express").Router();
const sequelize = require("sequelize");
const { Halfway } = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const likedYou = await Halfway.findAll({
      where: {
        otherUser: req.params.id,
      },
    });
    res.send(likedYou.data);
  } catch (error) {
    console.log("Error from API trying to query halfways");
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const newHalfway = await Halfway.create({
      currentUser: req.params.id,
      otherUser: req.body,
    });
    res.send(newHalfway);
  } catch (error) {
    console.log("Error in API trying to post to Halway");
    next(error);
  }
});

module.exports = router;
