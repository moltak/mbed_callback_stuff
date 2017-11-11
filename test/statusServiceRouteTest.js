const expect = require('chai').expect;
const request = require('supertest');
const path = require('path');

const app = require(path.resolve('app'));

describe('StatusServiceRouteTest', () => {
  it('returns status with fingerId', done => {
    request(app)
      .get('/status?fingerId=1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const status = res.body.status[0];
        expect(status).to.be.exist;
        expect(status.fingerId).to.be.exist;
        expect(status.status).to.be.exist;
        expect(status.gps.lat).to.be.exist;
        expect(status.gps.lng).to.be.exist;
        done();
      });
  });

  it('returns status 404 if fingerId off', done => {
    request(app)
      .get('/status?fingerId=fingerId100')
      .expect(404)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it('returns statueses', done => {
    request(app)
      .get('/status/all')
      .expect(200)
      .end((err, data)  => {
        if (err) return done(err);

        expect(data.body.statuses).to.have.lengthOf.above(0);
        expect(data.body.statuses[0].user).to.be.exist;
        done();
      });
  });
});
