const path = require('path');
const Sequelize = require('sequelize');
const Statistic = require(path.resolve('models/statistic'));
const db = require(path.resolve('db'));

class StatisticService {
  constructor(sequelize) {
    this.statistic = db.statistic;
  }

  async getStatistics() {
    const statistics = await this.statistic.findAll({});
    return statistics;
  }
}

module.exports = StatisticService;
