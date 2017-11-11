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

  async changeUserFingerId(email, fingerId) {
    const result = await this.user.update({fingerId: fingerId},
      {
        where: {
          email: email
        }
      }
    );

    return result[0] === 1;
  }

  async insertUser({firstName = '', lastName = '', email = '', family = '', phone = '', sns = '', fingerId = ''}) {
    const params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      family: family,
      phone: phone,
      sns: sns,
      fingerId: fingerId
    };
  
    const result = await this.user.create(params);
    return result !== undefined;
  }
}

module.exports = UserService;
