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
