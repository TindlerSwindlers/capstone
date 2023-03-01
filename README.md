# FS-App-Template

## Setup

- just clone this
- rm -rf .git
- git init
- git add .
- git commit -m 'first commit'
- set up origin on github


## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`, this is your database


## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
