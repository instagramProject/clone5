'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('posts', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    filepath: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return Posts;
};