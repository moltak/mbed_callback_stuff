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
    const email = 'demo1@demo.com';
    const user = await userService.getUser(email)
    expect(user).to.exist;
    expect(user.status).to.exist;
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

  it('returns family when user email exist', async () => {
    const email = 'demo1@demo.com';
    const family = await userService.getFamily(email)
    expect(family).to.exist;
    expect(family).to.have.lengthOf(3);
    expect(family[0].status).to.be.exist;
  });

  it('returns 0. when user has\'t family', async () => {
    const email = 'demo5@demo.com';
    const family = await userService.getFamily(email)
    expect(family).to.exist;
    expect(family).to.have.lengthOf(0);
  });
  
  it('returns exception user not exist', async () => {
    const email = 'demo6@demo.com';
    let family;
    let error;
    try {
      family = await userService.getFamily(email)
    } catch (e) {
      error = e;
    }

    expect(family).to.not.exist;
    expect(error).to.exist;
  });

  it('returns all users', async () => {
    const users = await userService.getAllUsers()
    expect(users).to.exist;
    expect(users).to.have.lengthOf.above(0);
  });

  it('returns false when failed to change user fingerId', async () => {
    const email = 'demo6@demo.com';
    const fingerId = 10;

    const result = await userService.changeUserFingerId(email, fingerId);
    expect(result).to.be.false;
  });

  it('returns true when success to change user fingerId', async () => {
    const email = 'demo1@demo.com';
    const fingerId = '10';

    const result = await userService.changeUserFingerId(email, fingerId);
    expect(result).to.be.true;
  });

  it('insert user', async () => {
    const params = {
      firstName: 'from', 
      lastName: 'test', 
      email: 'test@email.com', 
      family: 'family5',
      phone: 'test phone number',
      sns: 'sns'
    };

    try {
      const result = await userService.insertUser(params);
      expect(result).to.be.true;
    } catch (e) {
      if (e.name !== 'SequelizeUniqueConstraintError') {
        console.log(e);
        throw e;
      }
    }
  });
});
