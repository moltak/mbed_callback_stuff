var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).json({
    status: {
      fingerId: '1',
      status: 'ill',
      gps: {
        lat: 21.282776, 
        lng: -157.840591
      }
    }
  });
});

module.exports = router;
