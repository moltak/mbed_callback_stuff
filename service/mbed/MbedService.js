class MbedService {

  getResourcePath(type) {
    switch(type) {
      case 'fingerId':
        return '20001/0/5999';
      case 'status':
        return '20002/0/5998';
      case 'lat':
        return '20003/0/5999';
      case 'lng':
        return '20003/1/5999';
      default:
        throw new Error(`mbed ${type} resourceType is invaild`);
    }
  }
}

module.exports = MbedService;
