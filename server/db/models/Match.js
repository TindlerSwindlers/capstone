const Sequelize = require("sequelize");
const db = require("../db");

const Match = db.define("match", {
  user1Id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  user2Id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Match