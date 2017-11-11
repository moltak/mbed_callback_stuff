'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [
      {
        fingerId: '1',
        status: 'damaged',
        lat: '21.282776',
        lng: '-157.840591',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fingerId: '2',
        status: 'damaged',
        lat: '21.282076',
        lng: '-157.840591',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
