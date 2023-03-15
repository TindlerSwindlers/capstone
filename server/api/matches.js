const router = require("express").Router();
const sequelize = require("sequelize");
const {
  models: { Match },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const all = await Match.findAll();
    res.send(all);
  } catch (error) {
    console.log("Error in API trying to query to Match", error);
    next(error);
  }
});
router.post("/:user1/:user2", async (req, res, next) => {
  try {
    const newMatch = await Match.create({
      ...req.body,
      user1Id: req.params.user1,
      user2Id: req.params.user2,
    });
    res.send(newMatch);
  } catch (error) {
    console.log("Error in API trying to post to Match", error);
    next(error);
  }
});

module.exports = router;
