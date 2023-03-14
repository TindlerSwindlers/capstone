const Sequelize = require("sequelize");
const db = require("../db");

const Halfway = db.define("halfway", {

  otherUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Halfway