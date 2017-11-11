const expect = require('chai').expect;
const request = require('supertest');
const path = require('path');

const app = require(path.resolve('app'));

describe('StatusServiceRouteTest', () => {
  it('get', done => {
    request(app)
      .get('/status?fingerId=fingerId1')
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
});
