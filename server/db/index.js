//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

//associations could go here!
Post.belongsTo(User);
Comment.belongsTo(User);

User.hasMany(Post);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

module.exports = {
  db,
  models: {
    User,
    Post,
    Comment,
  },
};
