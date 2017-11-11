var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).json({
    statistic: [
      {
        wounded: 0,
        died: 0,
        damaged: 0
      }
    ]
  });
});

module.exports = router;
