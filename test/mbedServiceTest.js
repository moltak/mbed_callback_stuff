const expect = require('chai').expect;
const path = require('path');

const MbedService = require(path.resolve('service/mbed/MbedService'));

describe('MbedServiceTest', () => {
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
        expect(map.fingerId).to.equal('65');
        expect(map.status).to.equal('DEAD');
        expect(map.lat).to.equal('28.00');
        expect(map.lng).to.equal('106.00');
        expect(map.inserted).to.be.true;
        done();
      }).catch(done);
  });
  
  it('returns empty object when notifications come', done => {
    const body = {
      registrations: [{}]
    };

    mbedService.process(body)
      .then(map => {
        expect(map.fingerId).to.not.exist;
        expect(map.status).to.not.exist;
        expect(map.lat).to.not.exist;
        expect(map.lng).to.not.exist;
        expect(map.inserted).to.be.false;
        done();
      }).catch(done);
  });
});
