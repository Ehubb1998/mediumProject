'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Articles', [
        {
          id: 1,
          title: 'Test Article',
          body: 'here is my article',
          claps: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Articles', null, {});
  }
};
