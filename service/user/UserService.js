const path = require('path');
const Sequelize = require('sequelize');
const User = require(path.resolve('models/user'));

class UserService {
  constructor(sequelize) {
    this.user = User(sequelize, Sequelize);
  }

  async getUser(email) {
    let user = await this.user.findOne({
      where: {email: email}
    });

    user = user.get();  
    if (user === undefined) {
      throw new Error(`${email} is not exist in database`);
    }

    return user;
  }

  async getFamily(email) {
    let family = await this.user.findAll({
      where: {email: email}
    });

    return family;
  }

  async getAllUsers() {
    return this.user.findAll({});
  }
}

module.exports = UserService;
