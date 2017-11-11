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

        const status = res.body.status;
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
});
