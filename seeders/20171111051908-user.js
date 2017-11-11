'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Horhe',
        lastName: 'Spain',
        email: 'demo1@demo.com',
        fingerId: '1',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        url: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Luis',
        lastName: 'Mexico',
        email: 'demo2@demo.com',
        fingerId: '2',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        url: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jayoung',
        lastName: 'Ko',
        email: 'demo3@demo.com',
        fingerId: '3',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        url: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Anna',
        lastName: 'Kim',
        email: 'demo4@demo.com',
        fingerId: '4',
        family: 'family1',
        phone: '010',
        sns: 'kakao',
        url: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Kyungho',
        lastName: 'Jung',
        email: 'demo5@demo.com',
        fingerId: '5',
        family: 'family2',
        phone: '010',
        sns: 'kakao',
        url: 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
