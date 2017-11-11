const expect = require('chai').expect;
const path = require('path');
const request = require('supertest');

const app = require(path.resolve('app'));

describe('UserServiceRouteTest', () => {
  it('user by id', done => {
    const email = 'demo@demo.com';
    request(app)
      .get(`/user?email=${email}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const body = res.body;
        expect(body.user).to.exist;
        done();
      });
  });

  it('users', done => {
    request(app)
      .get('/user/all')
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const body = res.body;
        expect(body.users).to.exist;
        expect(body.users).to.have.lengthOf.above(0);
        done();
      });
  });

  it('relations', done => {
    const email = 'demo@demo.com';
    request(app)
      .get(`/user/relationship?email=${email}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const body = res.body;
        expect(body.users).to.exist;
        expect(body.users).to.have.lengthOf.above(0);
        done();
      });
  });
});
