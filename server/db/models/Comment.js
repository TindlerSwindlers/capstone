const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  likes: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Comment;
