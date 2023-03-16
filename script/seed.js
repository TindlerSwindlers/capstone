"use strict";

const {
  db,
  models: { User, Post, Comment },
} = require("../server/db");
const Match = require("../server/db/models/Match");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [cody, murphy, tiffany, laura, kia] = await Promise.all([
    User.create({
      username: "cody",
      name: "Cody",
      lastName: "Wilson",
      password: "123",
      imageUrl: "../../man1.jpg",
      gender: "male",
      interest: "female",
      hobbies: ["Fishing", "Skiing", "brewing my own beer"],
    }),
    User.create({
      username: "murphy",
      name: "Murphy",
      lastName: "Manzer",
      password: "123",
      imageUrl: "../../man2.jpeg",
      gender: "male",
      interest: "female",
      hobbies: ["Good music", "Wine", "Making people laugh"],
    }),
    User.create({
      username: "tiffany",
      name: "Tiffany",
      lastName: "Collins",
      password: "123",
      imageUrl: "../../woman1.jpg",
      gender: "female",
      interest: "male",
      hobbies: ["Web development", "Cooking", "Wine"],
    }),
    User.create({
      username: "laura",
      name: "Laura",
      lastName: "Soprano",
      password: "123",
      imageUrl: "../../woman2.jpg",
      gender: "female",
      interest: "male",
      hobbies: ["Paragliding", "Biking", "Cooking"],
    }),
    User.create({
      username: "kia",
      name: "Kia",
      lastName: "Sanders",
      password: "123",
      imageUrl: "../../man3.jpg",
      gender: "male",
      interest: "female",
      hobbies: ["Painting", "Visiting museums"],
    }),
  ]);

  const [post1, post2] = await Promise.all([
    Post.create({
      text: "I just watched an amazing movie-Godfather!!!",
      imageUrl: "../../godfather.jpg",
      likes: [1, 2, 3, 4],
      userId: murphy.id,
    }),
    Post.create({
      text: "Weather is perfect for a walk by the water",
      imageUrl: "../../river.jpg",
      likes: [1, 2, 3, 4, 5],
      userId: tiffany.id,
    }),
  ]);

  const [comment1, comment2, comment3] = await Promise.all([
    Comment.create({
      text: "Just when I thought I was out, they pull me back in!",
      likes: 10,
      userId: laura.id,
      postId: post1.id,
    }),
    Comment.create({
      text: "My favorite movie!",
      likes: 4,
      userId: cody.id,
      postId: post1.id,
    }),
    Comment.create({
      text: "You are right, it's beautiful today",
      likes: 4,
      userId: kia.id,
      postId: post2.id,
    }),
  ]);

  const [match1, match2] = await Promise.all([
    // Match.bulkCreate([{ user1Id: laura.id, user2Id: cody.id }]),
    Match.create({
      user1Id: tiffany.id,
      user2Id: murphy.id,
    }),
    Match.create({
      user1Id: laura.id,
      user2Id: cody.id,
    }),
  ]);

  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
