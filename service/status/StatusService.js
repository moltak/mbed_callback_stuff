const path = require('path');
const Sequelize = require('sequelize');
const Status = require(path.resolve('models/status'));

class StatusService {
  constructor(sequelize) {
    this.status = Status(sequelize, Sequelize);
  }

  async getStatus(fingerId) {
    let status = await this.status.findOne({
      where: {fingerId: fingerId}
    });

    if (!status) {
      throw new Error(`${fingerId} id not exist in database.`);
    }

    return status;
  }

  async getAllStatuses() {
    const statuses = await this.status.findAll({});
    return statuses;
  }
}

module.exports = StatusService;
