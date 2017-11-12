const expect = require('chai').expect;
const path = require('path');
const sinon = require('sinon');

const MbedService = require(path.resolve('service/mbed/MbedService'));

describe.only('MbedServiceTest', () => {
  const mbedService = new MbedService();

  it('not resturns any exceptions', () => {
    mbedService.registrationCallback();
  });

  it('parsing base64 data', () => {
    const data = '65/DEAD/28.00/106.00';
    const map = mbedService.getMap(data);
    expect(map.fingerId).to.equal('65');
    expect(map.status).to.equal('DEAD');
    expect(map.lat).to.equal('28.00');
    expect(map.lng).to.equal('106.00');
  }); 

  it('returns map object when notifications come', done => {
    const body = {
      notifications: [
        {
          ep: '015f621244ec000000000001001001a3',
          path: '/20004/0/5998',
          ct: 'text/plain',
          payload: 'NTEvREVBRC8xNjEuMDAvNzMuMDA=',
          'max-age': 60
        }
      ]
    };

    mbedService.process(body)
      .then(map => {
        expect(map.fingerId).to.equal('51');
        expect(map.status).to.equal('DEAD');
        expect(map.lat).to.equal('161.00');
        expect(map.lng).to.equal('73.00');
        expect(map.inserted).to.be.true;
        expect(map.sentNotification).to.be.true;
        done();
      }).catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          done();
        } else {
          done(err);
        }
      });
  });
  
  it('returns empty object when notifications come', done => {
    const body = {
      registrations: [{}]
    };

    mbedService.process(body)
      .then(map => {
        expect(map).to.be.undefined;
        done();
      }).catch(done);
  });

  it('my status is invaild, send notify to our friends', done => {
    const body = {
      notifications: [
        {
          payload: 'NTEvREVBRC8xNjEuMDAvNzMuMDA='
        }
      ]
    };

    mbedService.process(body)
      .then(() => {
        done();
      }).catch(err => {
        done(err);
      });
  });
});
