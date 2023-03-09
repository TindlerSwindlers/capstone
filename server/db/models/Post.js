const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  likes: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
});

module.exports = Post;
