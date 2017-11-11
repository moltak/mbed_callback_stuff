const path = require('path');

const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const User = require(path.resolve('models/user'));
const Status = require(path.resolve('models/status'));
const Statistic = require(path.resolve('models/statistic'));

let user, status, statistic;

if (!user) user = User(sequelize, Sequelize);
if (!status) status = Status(sequelize, Sequelize);
if (!statistic) statistic = Statistic(sequelize, Sequelize);

user.hasOne(status);
status.belongsTo(user);

module.exports = {
  user: user,
  status: status,
  statistic: statistic
};
