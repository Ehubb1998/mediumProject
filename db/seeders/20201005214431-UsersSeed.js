"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@test.com", hashedPassword: bcrypt.hashSync("test"), userName: "Demo", bio: "This is just a demo", createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
