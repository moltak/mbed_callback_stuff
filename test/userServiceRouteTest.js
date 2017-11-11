const expect = require('chai').expect;
const path = require('path');
const request = require('supertest');

const app = require(path.resolve('app'));

describe('UserServiceRouteTest', () => {
  it('user by id', done => {
    const email = 'demo1@demo.com';
    request(app)
      .get(`/user?email=${email}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const body = res.body;
        expect(body.user[0]).to.exist;
        expect(body.user[0].status).to.exist;
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

  it('family', done => {
    const email = 'demo1@demo.com';
    request(app)
      .get(`/user/family?email=${email}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);

        const body = res.body;
        expect(body.users).to.exist;
        expect(body.users).to.have.lengthOf.above(0);
        expect(body.users[0].status).to.be.exist;
        done();
      });
  });

  it('update finger id', done => {
    const email = 'demo1@demo.com';
    const fingerId = '10';

    request(app)
      .put(`/user?email=${email}`)
      .send({fingerId: fingerId})
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        expect(body).to.be.exist;
        done();
      });
  });

  it('insert user', done => {
    const params = {
      firstName: 'from', 
      lastName: 'test', 
      email: 'test@email.com', 
      family: 'family5',
      phone: 'test phone number',
      sns: 'sns'
    };

    request(app)
      .post('/user')
      .send(params)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        expect(body).to.be.exist;
        done();
      });
  });
});
