const path = require('path');
const Sequelize = require('sequelize');
const Status = require(path.resolve('models/status'));
const User = require(path.resolve('models/user'));
const db = require(path.resolve('db'));

class StatusService {
  constructor(sequelize) {
    this.status = db.status;
    this.user = db.user;
  }

  async insertStatus(params) {
    if (!params) throw new Error('insertStatus params is null');

    const result = await this.status.create(params);
    return result !== undefined;
  }

  async getStatus(fingerId) {
    let status = await this.status.findOne({
      where: {fingerId: fingerId},
      include: [
        {
          model: this.user
        }
      ]
    });

    if (!status) {
      throw new Error(`${fingerId} id not exist in database.`);
    }

    if (status.User) {
      status.user = status.User.get();
      delete status.User;
    }

    return status;
  }

  async getAllStatuses() {
    const statuses = await this.status.findAll({
      include: [
        {
          model: this.user
        }
      ]
    });

    return statuses.map(i => {
      return Object.assign({}, {
        fingerId: i.fingerId,
        status: i.status,
        lat: i.lat,
        lng: i.lng,
        user: !i.User ? undefined : i.User.get()
      });
    });

    return statuses;
  }
}

module.exports = StatusService;
