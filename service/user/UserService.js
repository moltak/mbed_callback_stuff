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

    if (!user) {
      throw new Error(`${email} is not exist in database`);
    }

    return user.get();  
  }

  async getFamily(email) {
    const user = await this.getUser(email)

    let family = await this.user.findAll({
      where: {
        family: user.family,
        email: {
          ne: user.email 
        }
      }
    });

    return family;
  }

  async getAllUsers() {
    return this.user.findAll({});
  }
}

module.exports = UserService;
