//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment  = require("./models/Comment");
const Match = require("./models/Match");
const Halfway = require("./models/Halfway");
const UserMatch  = require("./models/UserMatch");


//associations could go here!
Post.belongsTo(User);
Comment.belongsTo(User);

User.hasMany(Post);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

Halfway.belongsTo(User);
User.hasMany(Halfway);

UserMatch.belongsTo(User);
User.hasMany(UserMatch);

UserMatch.belongsTo(Match);
Match.hasMany(UserMatch)

module.exports = {
  db,
  models: {
    User,
    Post,
    Comment,
    Match,
    Halfway,
    UserMatch
  },
};
