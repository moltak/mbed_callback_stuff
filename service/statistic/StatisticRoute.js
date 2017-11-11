const express = require('express');
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const StatisticService = require(path.resolve('service/statistic/StatisticService'));

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const statisticService = new StatisticService(sequelize);

router.get('/', function(req, res) {
  statisticService.getStatistics()
    .then(i => {
      res.status(200).json({statistics: i});
    }).catch(() => {
      res.status(500).end();
    });
});

module.exports = router;
