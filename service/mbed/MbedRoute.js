const express = require('express');
const router = express.Router();
const path = require('path');

const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const MbedService = require(path.resolve('service/mbed/MbedService'));
const mbedService = new MbedService(sequelize);

router.get('/callback', (req, res) => {
  res.status(200).send('ok');
});

router.put('/callback', (req, res) => {
  printMbedParams(req.body);
  res.status(200).send('ok');
});

function printMbedParams(body) {
  let base64Payload;

  if (body['async-responses']) {
    base64Payload = body['async-responses'][0].payload;
  }
  
  if (body['notifications']) {
    base64Payload = body['notifications'][0].payload;
  }

  if (base64Payload) {
    const payload = extractPayload(base64Payload);
    console.log(payload);
  }
}

function extractPayload(payload) {
  var buffer = new Buffer(payload, 'base64');
  return buffer.toString();
}

module.exports = router;
