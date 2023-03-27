const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
    text: {
        type: Sequelize.STRING,
    }
});

module.exports = Message;
