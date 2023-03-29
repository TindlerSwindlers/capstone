const router = require("express").Router();
const {
  models: { User, Message },
} = require("../db");

//create a new message
router.post("/", async (req, res, next) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
    });
    res.json(newMessage);
  } catch (err) {
    next(err);
  }
});

//get all messages for a certain user
router.get("/:id", async (req, res, next) => {
  try {
    let messages = await Message.findAll({
      where: {
        userReceivingId: req.params.id,
      },
      include: [
        { model: User, as: "userReceiving" },
        { model: User, as: "userSending" },
      ],
      order: [["updatedAt", "DESC"]],
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
