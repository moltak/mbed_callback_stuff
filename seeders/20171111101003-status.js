'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [{
      fingerId: '1',
      status: 'status',
      lat: '21.282776',
      lng: '-157.840591',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
