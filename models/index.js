'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
  console.log('Create sequelize with config use env variable');
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log('Creating sequelize connection..');
}

fs
  .readdirSync(__dirname)
  .filter(file => {
   // console.log('reading file at this point..')
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/*var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

// Load DB config from config file
var config = require(path.join(__dirname, 'config', 'config.json'));

// Init sequelize with params from config file
var sequelize = new Sequelize('postgres://postgres:nppsjuoll@localhost:5432/iclone');

// Empty db object to hold our models
var db = {};

fs.readdirSync(path.join(__dirname, 'models'))
.filter(function(file) {
	// load all files except index.js (this file)
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	// For every model file, add the model to our db object
	var model = sequelize.import(path.join(__dirname, 'models', file));
	db[model.name] = model;
});

// Loop through models and check for the associate method.
// If the associate method exists, call it.
// The associations defined in our models will then initialized.
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Use sequelize with uppercase or lowercase
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;*/