'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Horhe',
        lastName: 'Spain',
        email: 'demo@demo.com',
        fingerId: '1',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Luis',
        lastName: 'Mexico',
        email: 'demo@demo.com',
        fingerId: '2',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jayoung',
        lastName: 'Ko',
        email: 'demo@demo.com',
        fingerId: '3',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Anna',
        lastName: 'Kim',
        email: 'demo@demo.com',
        fingerId: '4',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Kyungho',
        lastName: 'Jung',
        email: 'demo@demo.com',
        fingerId: '5',
        family: 'family2',
        phone: '010',
        sns: 'kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
