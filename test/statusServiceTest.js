const path = require('path');
const expect = require('chai').expect;

const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const StatusService = require(path.resolve('service/status/StatusService'));

describe('StatusServiceTest', () => {
  let statusService;
  before(() => {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    statusService = new StatusService(sequelize);
  });

  it('returns status if fingerId is exist', done => {
    const fingerId = '1';
    statusService
      .getStatus(fingerId)
      .then(i => {
        const status = i;
        expect(status).to.be.exist;
        done();
      }).catch(done);
  });

  it('returns exception if fingerId off ', done => {
    const fingerId = '1000';
    statusService
      .getStatus(fingerId)
      .then(data => {
        expect(false).to.be.true;
        done();
      }).catch(err => {
        expect(err).to.be.exist;
        expect(err.message.indexOf('not exist') !== -1).to.be.true;
        done();
      });
  });
});

