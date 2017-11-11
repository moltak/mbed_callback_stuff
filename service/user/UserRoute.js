var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).json({
    user: {}
  });
});

router.get('/all', function(req, res) {
  res.status(200).json({
    users: [
      {}
    ]
  });
});

router.get('/relationship', function(req, res) {
  res.status(200).json({
    users: [
      {}
    ]
  });
});

module.exports = router;
