const router = require("express").Router();
const sequelize = require("sequelize");
const { Match } = require("../db");

router.post("/:id", async (req, res, next) => {
  try {
    await Match.create({
      ...req.body,
      user1Id: req.params.id,
      user2Id: req.body.user2Id,
    });
  } catch (error) {
    console.log("Error in API trying to post to Match", error);
    next(error);
  }
});

module.exports = router;
