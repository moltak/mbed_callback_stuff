var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).send('ok');
});

router.get('/mbed-callback', (req, res) => {
  console.log(req.body);
  console.log(req.data);
  res.status(200).send('ok');
});

router.put('/mbed-callback', (req, res) => {
  console.log(req.body);
  try {
    const payload = req.body['async-responses'][0].payload
    var b = new Buffer(payload, 'base64')
    var s = b.toString();
    console.log(s);
  } catch (e) {}

  try {
    const payload = req.body['notifications'][0].payload;
    var b = new Buffer(payload, 'base64');
    var s = b.toString();
    console.log(s);
  } catch (e) {}
  res.status(200).send('ok');
});

module.exports = router;
