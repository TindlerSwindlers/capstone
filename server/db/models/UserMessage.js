const Sequelize = require("sequelize");
const db = require("../db");

const UserMessage = db.define("User-Message", {});

module.exports = UserMessage;