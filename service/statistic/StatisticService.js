const path = require('path');
const Sequelize = require('sequelize');
const Statistic = require(path.resolve('models/statistic'));

class StatisticService {
  constructor(sequelize) {
    this.statistic = Statistic(sequelize, Sequelize);
  }

  async getStatistics() {
    const statistics = await this.statistic.findAll({});
    return statistics;
  }
}

module.exports = StatisticService;
