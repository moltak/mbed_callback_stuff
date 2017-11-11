const path = require('path');
const Sequelize = require('sequelize');
const Status = require(path.resolve('models/status'));
const User = require(path.resolve('models/user'));

class StatusService {
  constructor(sequelize) {
    this.status = Status(sequelize, Sequelize);
    this.user = User(sequelize, Sequelize);

    this.status.belongsTo(this.user);
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
