'use strict';
module.exports = (sequelize, DataTypes) => {
  var Statistic = sequelize.define('Statistic', {
    wounded: DataTypes.INTEGER,
    died: DataTypes.INTEGER,
    damaged: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Statistic;
};
