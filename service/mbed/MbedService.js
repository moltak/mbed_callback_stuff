const request = require('request');
const Promise = require('bluebird');
const path = require('path');
const Sequelize = require('sequelize');
const db = require(path.resolve('db'));
const bus = require(path.resolve('bus'));
const StatusService = require(path.resolve('service/status/StatusService'));

class MbedService {
  constructor() {
    this.mbedUrl = 'https://api.us-east-1.mbedcloud.com/v2/subscriptions/015f621244ec000000000001001001a3/';
    this.token = 'Bearer ak_1MDE1ZTc2YmJlMzU3MDI0MjBhMDE0ZTEwMDAwMDAwMDA015f66aca01f02420a010a1000000000GjHvffvVbrZJ3ubO8NQSyFjlCwg6GUxk';
    this.resourceId = '20004/0/5998';
    this.statusService = new StatusService();
  }

  async process(body) {
    let map;
    let status;

    if (body['notifications']) {
      const base64Payload = body['notifications'][0].payload;
      const payload = this.extractPayload(base64Payload);
      map = this.getMap(payload);
    }

    if (map) {
      status = await this.statusService.getStatus(map.fingerId);
      if (status.User) {
        status.user = status.User.get();
        delete status.User;
      }

      status.status = map.status;
      status.lat = map.lat;
      status.lng = map.lng;
      //if (map.status === 'DECEASED') {
      bus.onNext(status);
      map.sentNotification = true;
      //}
    }

    if (map) {
      /**
       * trash code T_T. 
       * I should use upsert function but I don't know how to do.
       */
      map.id = status.id;
      try {
        const result = await this.statusService.insertStatus(map);
        map.inserted = result;
      } catch (e) {
        console.error(e);
      }
    }

    return map;
  }

  extractPayload(payload) {
    var buffer = new Buffer(payload, 'base64');
    return buffer.toString();
  }

  async registrationCallback() {
    const result = await this.sendRequest(this.resourceId);
    console.log(result);
  }

  sendRequest(resourceId) {
    return new Promise((resolve, reject) => {
      request({
        method: 'put',
        headers: {
          Authorization: this.token
        },
        url: this.mbedUrl + resourceId
      }, (err, res) => {
        if (err) return reject(err);
        resolve(res.statusCode === 200);

      });
    });
  }

  getMap(data) {
    const splits = data.split('/');
    return {
      fingerId: splits[0],
      status: splits[1],
      lat: splits[2],
      lng: splits[3]
    };
  }
}

module.exports = MbedService;
