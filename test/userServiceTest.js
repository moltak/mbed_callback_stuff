const path = require('path');
const expect = require('chai').expect;
const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const UserService = require(path.resolve('service/user/UserService'));

describe('UserServiceTest', () => {
  let userService = undefined;

  before(() => {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    userService = new UserService(sequelize);
  });

  it('returns user when user email exist', async () => {
    const email = 'demo@demo.com';
    const user = await userService.getUser(email)
    expect(user).to.exist;
  });

  it('returns throws exception when user email not exist', async () => {
    const email = undefined;

    let user;
    let error;
    try {
      user = await userService.getUser(email);
    } catch (e) {
      error = e;
    }

    expect(user).to.not.exist;
    expect(error).to.exist;
  });
});
