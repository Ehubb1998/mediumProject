"use strict";

const faker = require("faker");
const random = (n) => {
  return Math.floor(Math.random() * Math.floor(n));
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Articles",
      [
        {
          title: faker.company.catchPhraseDescriptor(),
          body: faker.lorem.paragraphs(),
          claps: faker.random.number(),
          userId: 42,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: faker.company.catchPhraseDescriptor(),
          body: faker.lorem.paragraphs(),
          claps: faker.random.number(),
          userId: random(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: faker.company.catchPhraseDescriptor(),
          body: faker.lorem.paragraphs(),
          claps: faker.random.number(),
          userId: random(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: faker.company.catchPhraseDescriptor(),
          body: faker.lorem.paragraphs(),
          claps: faker.random.number(),
          userId: random(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: faker.company.catchPhraseDescriptor(),
          body: faker.lorem.paragraphs(),
          claps: faker.random.number(),
          userId: random(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Articles", null, {});
  },
};
