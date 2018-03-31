'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var config    = require('../config/env/config')();
var env       = config.env || 'development';
var db :any   = {};
const modelRelations = require('./relations/relations')

if (config.dbURL) {
  var sequelize = new Sequelize(config.dbURL);
} else {
  var sequelize = new Sequelize(config.db, config.username, config.password);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    let extension = '.js'
    if(process.env.NODE_ENV == 'development') extension = '.ts'
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === `${extension}`);
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

modelRelations(db);

module.exports = db;
