'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Authors', [
      {
        name: 'Jane Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
