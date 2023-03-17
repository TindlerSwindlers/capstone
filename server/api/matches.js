const router = require("express").Router();
const sequelize = require("sequelize");
const {
  models: { Match, Halfway, UserMatch, User },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    let matches = await UserMatch.findAll({
      where: {
        userId: req.params.id,
      },
      include: {
        model: Match,
        include: [
          { model: User, as: "user2" },
          { model: User, as: "user1" },
        ],
      },
    });
    res.send(matches);
  } catch (error) {
    console.log("Error getting matches from API", error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Halfway.destroy({
      where: { likedUserId: req.body.user1 },
    });
    const newMatch = await Match.create({
      user1Id: req.body.user1,
      user2Id: req.body.user2,
    });
    await UserMatch.create({ userId: req.body.user1, matchId: newMatch.id });
    await UserMatch.create({ userId: req.body.user2, matchId: newMatch.id });
    res.send(newMatch);
  } catch (error) {
    console.log("Error in API trying to post to Match", error);
    next(error);
  }
});

module.exports = router;
