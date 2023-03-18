//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Match = require("./models/Match");
const Halfway = require("./models/Halfway");
const UserMatch = require("./models/UserMatch");
const Message = require("./models/Message")

//associations could go here!
Post.belongsTo(User);
Comment.belongsTo(User);

User.hasMany(Post);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

// Halfway.belongsTo(User);
// User.hasMany(Halfway);
Halfway.belongsTo(User, { as: "currentUser" });
Halfway.belongsTo(User, { as: "likedUser" });

Match.belongsTo(User, { as: "user1" });
Match.belongsTo(User, { as: "user2" });
User.belongsTo(Match);

// Match.hasOne(User, { foreignKey: "user2Id", as: "user2", targetKey: "id" });
// User.belongsToMany(User, { as: "match", through: "UserMatch" });

UserMatch.belongsTo(User);
User.hasMany(UserMatch);

UserMatch.belongsTo(Match);
Match.hasMany(UserMatch);

Message.belongsTo(User);
User.hasMany(Message);

module.exports = {
  db,
  models: {
    User,
    Post,
    Comment,
    Match,
    Halfway,
    UserMatch,
    Message
  },
};
