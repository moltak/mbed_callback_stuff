const expect = require('chai').expect;
const path = require('path');

const MbedService = require(path.resolve('service/mbed/MbedService'));

describe('MbedServiceTest', () => {
  const mbedService = new MbedService();
  
  it('returns 20001/0/5999 when receives fingerId', () => {
    const path = mbedService.getResourcePath('fingerId');
    expect(path).to.be.equal('20001/0/5999');
  });

  it('returns 20002/0/5998 when receives status', () => {
    const path = mbedService.getResourcePath('status');
    expect(path).to.be.equal('20002/0/5998');
  });

  it('returns 20003/0/5999 when receives lat', () => {
    const path = mbedService.getResourcePath('lat');
    expect(path).to.be.equal('20003/0/5999');
  });

  it('returns 20003/1/5999 when receives lng', () => {
    const path = mbedService.getResourcePath('lng');
    expect(path).to.be.equal('20003/1/5999');
  });
});
