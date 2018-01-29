'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      
      }
    }
  });
  return User;
};