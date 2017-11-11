/*eslint-disable no-alert, no-console */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).send('ok');
});

router.get('/mbed-callback', (req, res) => {
  console.log('-------');
  console.log('body: %j', req.body);
  console.log('query: %j', req.query);
  console.log('-------');
  res.status(200).send('ok');
});

router.put('/mbed-callback', (req, res) => {
  printMbedParams(req.body);
  res.status(200).send('ok');
});

function printMbedParams(body) {
  console.log('-------');
  console.log('%j', body);
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

  console.log('-------');
}

function extractPayload(payload) {
  var buffer = new Buffer(payload, 'base64');
  return buffer.toString();
}

module.exports = router;
