const path = require('path');
const Sequelize = require('sequelize');
const User = require(path.resolve('models/user'));
const Status = require(path.resolve('models/status'));

class UserService {
  constructor(sequelize) {
    this.user = User(sequelize, Sequelize);
    this.status = Status(sequelize, Sequelize);
    this.user.hasOne(this.status);
  }

  async getUser(email) {
    let user = await this.user.findOne({
      where: {email: email},
      include: [
        {
          model: this.status
        }
      ] 
    });

    if (!user) {
      throw new Error(`${email} is not exist in database.`);
    }

    user = user.get();
    if (user.Status) {
      user.status = user.Status.get();
      delete user.Status;
    }

    return user;
  }

  async getFamily(email) {
    const user = await this.getUser(email);

    let family = await this.user.findAll({
      where: {
        family: user.family,
        email: {
          ne: user.email 
        }
      },
      include: [
        {
          model: this.status
        }
      ]
    });

    return family.map(i => {
      return Object.assign({}, {
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        fingerId: i.fingerId,
        phone: i.phone,
        sns: i.sns,
        status: !i.Status ? undefined : i.Status.get()
      });
    });
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
