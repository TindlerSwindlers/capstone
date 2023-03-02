"use strict";

const {
  db,
  models: { User },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      name: "Cody",
      lastName: "Wilson",
      password: "123",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fman&psig=AOvVaw23HVkZQ0OiDn__DmjvlKsS&ust=1677810380471000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPiF0O-YvP0CFQAAAAAdAAAAABAE",
      gender: "male",
      interest: "female",
      hobbies: "Fishing, skiing, brewing my own beer",
    }),
    User.create({
      username: "murphy",
      name: "Murphy",
      lastName: "Manzer",
      password: "123",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fyoung-men&psig=AOvVaw23HVkZQ0OiDn__DmjvlKsS&ust=1677810380471000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPiF0O-YvP0CFQAAAAAdAAAAABAJ",
      gender: "male",
      interest: "female",
      hobbies: "Good music, wine and making people laugh",
    }),
    User.create({
      username: "tiffany",
      name: "Tiffany",
      lastName: "Collins",
      password: "123",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lofficielsingapore.com%2Fculture%2F19-year-old-most-beautiful-woman-in-the-world&psig=AOvVaw35v5jCvHEmzAz9nqMumDiT&ust=1677810654675000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOC9rvKZvP0CFQAAAAAdAAAAABAE",
      gender: "female",
      interest: "male",
      hobbies: "Web development, cooking and good wine",
    }),
    User.create({
      username: "laura",
      name: "Laura",
      lastName: "Soprano",
      password: "123",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fwoman&psig=AOvVaw35v5jCvHEmzAz9nqMumDiT&ust=1677810654675000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOC9rvKZvP0CFQAAAAAdAAAAABAJ",
      gender: "female",
      interest: "male",
      hobbies: "Paragliding, biking and cooking",
    }),
    User.create({
      username: "kia",
      name: "Kia",
      lastName: "Sanders",
      password: "123",
      imageUrl:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nfl.com%2Fnews%2Fnext-woman-up-molly-higgins-evp-of-community-affairs-and-engagement-for-the-los-&psig=AOvVaw35v5jCvHEmzAz9nqMumDiT&ust=1677810654675000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOC9rvKZvP0CFQAAAAAdAAAAABAT",
      gender: "male",
      hobbies: "Painting and visiting museums",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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
