'use strict';
module.exports = (sequelize, DataTypes) => {
  var Content = sequelize.define('Content', {
    photo: DataTypes.STRING,
    comments: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Content;
};