var express = require('express');
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const UserService = require(path.resolve('service/user/UserService'));

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const userService = new UserService(sequelize);

router.get('/', function(req, res) {
  userService.getUser('demo1@demo.com')
    .then(i => {
      res.status(200).json({
        user: i
      });
    }).catch(() => {
      res.status(500).end();
    });
});

router.get('/all', function(req, res) {
  userService.getAllUsers()
    .then(i => {
      res.status(200).json({
        users: i
      });
    }).catch(() => {
      res.status(500).end();
    });
});

router.get('/family', function(req, res) {
  userService.getFamily('demo1@demo.com')
    .then(i => {
      res.status(200).json({
        users: i
      });
    }).catch(() => {
      res.status(500).end();
    });
});

module.exports = router;
