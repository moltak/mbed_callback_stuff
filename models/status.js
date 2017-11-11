'use strict';
module.exports = (sequelize, DataTypes) => {
  var Status = sequelize.define('Status', {
    fingerId: DataTypes.STRING,
    status: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Status;
};
