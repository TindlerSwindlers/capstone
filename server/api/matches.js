const router = require("express").Router();
const sequelize = require("sequelize");
const {
  models: { Match, Halfway, UserMatch },
} = require("../db");

// router.get("/:id", async (req, res, next) => {
//   try {
//     const all = await Match.findAll({
//       where: {
//         user1Id: req.params.id,
//       } || {
//         user2Id: req.params.id,
//       },
//     });
//     res.send(all);
//   } catch (error) {
//     console.log("Error in API trying to query to Match", error);
//     next(error);
//   }
// });
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
    res.send(newMatch);
  } catch (error) {
    console.log("Error in API trying to post to Match", error);
    next(error);
  }
});

module.exports = router;
