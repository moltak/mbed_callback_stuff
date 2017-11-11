var express = require('express');
var router = express.Router();

const fakeUser = {
  firstName: 'Luis',
  lastName: 'Ko',
  fingerId: 'fingerId1',
  famaily: 'family1',
  phone: '01012345678',
  sns: 'kakaotalk id?'
};

router.get('/', function(req, res) {
  res.status(200).json({
    user: fakeUser
  });
});

router.get('/all', function(req, res) {
  res.status(200).json({
    users: [
      fakeUser
    ]
  });
});

router.get('/family', function(req, res) {
  res.status(200).json({
    users: [
      fakeUser
    ]
  });
});

module.exports = router;
