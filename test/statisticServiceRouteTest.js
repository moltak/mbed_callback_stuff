const expect = require('chai').expect;
const request = require('supertest');
const path = require('path');

const app = require(path.resolve('app'));

describe('StatisticsServiceRouteTest', () => {
  it('returns statistic data', done => {
    request(app)
      .get('/statistic')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const statistic = res.body.statistics[0];
        expect(statistic).to.be.exist;
        expect(statistic.wounded).to.be.exist;
        expect(statistic.died).to.be.exist;
        expect(statistic.damaged).to.be.exist;
        done();
      });
  });
});
