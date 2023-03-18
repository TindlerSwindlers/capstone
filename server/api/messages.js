const router = require("express").Router();
const {
    models: { User, Message},
  } = require('../db');


router.get('/', async (req, res, next) => {
    try {
      const messages = await Message.findAll({
        include: [
          { model: User, as: "userReceiving"},
          { model: User, as: "userSending"},
        ],
        order: [['updatedAt', 'DESC']],
      });
      res.json(messages);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      let messages = await Message.findAll({
        where: {
          userReceivingId: req.params.id,
        },
        include: [
          { model: User, as: "userReceiving"},
          { model: User, as: "userSending"},
        ],
        order: [['updatedAt', 'DESC']],
    })
      res.json(messages);
    } catch (err) {
      next(err);
    }
  });

  router.post('/:id', async (req, res, next) => {
    try {
     const newMessage = Message.create({
        ...req.body,
        userId: req.params.id
     })
      res.json(newMessage);
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;