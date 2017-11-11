const express = require('express');
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');

const config = require(path.resolve('config/config'))[process.env.NODE_ENV];
const StatusService = require(path.resolve('service/status/StatusService'));

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const statusService = new StatusService(sequelize);

router.get('/', function(req, res) {
  const fingerId = req.query.fingerId;

  statusService.getStatus(fingerId)
    .then(i => {
      res.status(200).json({
        status: [{
          id: i.id,
          fingerId: i.fingerId,
          status: i.status,
          gps: {
            lat: i.lat,
            lng: i.lng
          }
        }]
      });
    })
    .catch(err => {
      if (err.message.indexOf('not exist') !== -1) {
        return res.status(404).end();
      }
      res.status(500).end();
    });
});

router.get('/all', function(req, res) {
  statusService.getAllStatuses()
    .then(statuses => {
      res.status(200).json({
        statuses: statuses.map(i => {
          return {
            id: i.id,
            fingerId: i.fingerId,
            status: i.status,
            gps: {
              lat: i.lat,
              lng: i.lng
            },
            user: i.user
          };
        })
      });
    })
    .catch(err => {
      if (err.message.indexOf('not exist') !== -1) {
        return res.status(404).end();
      }
      res.status(500).end();
    });
});

/**
router.post('/', function(req, res) {
  res.status(200).json({
    status: {
      fingerid: '1',
      status: 'ill',
      gps: {
        lat: 21.282776, 
        lng: -157.840591
      }
    }
  });
});

router.put('/', function(req, res) {
  res.status(200).json({
    status: {
      fingerid: '1',
      status: 'ill',
      gps: {
        lat: 21.282776, 
        lng: -157.840591
      }
    }
  });
});
 **/

module.exports = router;
