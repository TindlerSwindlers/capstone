const router = require("express").Router();
const sequelize = require("sequelize");
const {
  models: { Halfway, User },
} = require("../db");

//get all users that sent you a spark
router.get("/:id", async (req, res, next) => {
  try {
    const likedYou = await Halfway.findAll({
      include: { model: User, as: "currentUser" },
      where: {
        likedUserId: req.params.id,
      },
    });
    res.send(likedYou);
  } catch (error) {
    console.log("Error from API trying to query halfways");
    next(error);
  }
});

//create a new spark
router.post("/:id/:sparkId", async (req, res, next) => {
  try {
    const newHalfway = await Halfway.create({
      ...req.body,
      currentUserId: req.params.id,
      likedUserId: req.params.sparkId,
    });
    res.send(newHalfway);
  } catch (error) {
    console.log("Error in API trying to post to Halway");
    next(error);
  }
});

module.exports = router;
