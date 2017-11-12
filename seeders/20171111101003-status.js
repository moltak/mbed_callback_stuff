'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [
      {
        fingerId: '1',
        status: 'DISEASE',
        lat: '37.485251', 
        lng: '126.901252',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fingerId: '2',
        status: 'OK',
        lat: '37.484557', 
        lng: '127.033961',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fingerId: '3',
        status: 'OK',
        lat: '37.523924', 
        lng: '127.019424',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fingerId: '4',
        status: 'OK',
        lat: '37.529256', 
        lng: '126.967712',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fingerId: '5',
        status: 'OK',
        lat: '37.571026', 
        lng: '127.009099',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
