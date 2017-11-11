var express = require('express');
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const UserService = require(path.resolve('service/user/UserService'));

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const userService = new UserService(sequelize);

router.get('/', function(req, res) {
  const email = req.query.email;

  userService.getUser(email)
    .then(i => {
      res.status(200).json({
        user: [i]
      });
    }).catch(e => {
      if (e.message.indexOf('not exist') !== -1) {
        return res.status(400).end();
      } 
      return res.status(500).end();
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
  const email = req.query.email;

  userService.getFamily(email)
    .then(i => {
      res.status(200).json({
        users: i
      });
    }).catch(e => {
      if (e.message.indexOf('not exist') !== -1) {
        return res.status(400).end();
      } 
      return res.status(500).end();
    });
});

module.exports = router;
