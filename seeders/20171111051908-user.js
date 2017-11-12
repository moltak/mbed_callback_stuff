'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: '루이스',
        lastName: '멕시코!',
        email: 'demo2@demo.com',
        fingerId: '1',
        family: 'family1',
        phone: '01018284957',
        sns: 'kakao',
        url: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/13879285_10154361426454747_1589610975328931632_n.jpg?oh=8e860393d2378a02a72b02f333fa64ef&oe=5A971643',
        telegram: '475982712',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: '안나',
        lastName: '벨라',
        email: 'demo4@demo.com',
        fingerId: '2',
        family: 'family1',
        phone: '01026385604',
        sns: 'kakao',
        url: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/23244305_377230426046176_8005470114170796063_n.jpg?oh=d84fe57f07258729dd4cd76ca294037c&oe=5AAC80FE',
        telegram: '474215211',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: '호르헤',
        lastName: '스페인이예요',
        email: 'demo1@demo.com',
        fingerId: '3',
        family: 'family2',
        phone: '01018270967',
        sns: 'kakao',
        url: 'https://scontent-icn1-1.xx.fbcdn.net/v/t31.0-1/c272.87.1088.1088/1267075_10152212693842846_273408204_o.jpg?oh=9947b0673e1c2782b56c625e2cd59ace&oe=5AAAEC1D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: '경호',
        lastName: '한국',
        email: 'demo5@demo.com',
        fingerId: '4',
        family: 'family1',
        phone: '01036475819',
        sns: 'kakao',
        url: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/11938027_10206132871694705_7333699139253409118_n.jpg?oh=fb4dfd52dc082d5414fcf95d2930b73d&oe=5AA44DC6',
        telegram: '24177202',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: '재영',
        lastName: '핵노잼',
        email: 'demo3@demo.com',
        fingerId: '5',
        family: 'family1',
        phone: '01028461029',
        sns: 'kakao',
        url: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/14212070_967675333378911_2577922332242938542_n.jpg?oh=6ff76dd719494c3ffea9e34e619ac4c4&oe=5AA9E6B7',
        telegram: '422403867',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
