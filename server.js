'use strict';

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var fs             = require('fs');

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

// Config
var config         = require('./config/config');
var db             = mongoose.connect(config.db);

// Require models
var models_path = config.root_dir + '/app/models';
var model_walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            model_walk(newPath);
        }
    });
};
model_walk(models_path);

var passport = require('passport');

require('./config/passport')(passport);

// Configure Express and Passport
require('./config/express')(app, db, passport);

var router = express.Router();

// Require routes
(function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$)/.test(file)) {
                require(newPath)(router, passport);
            }
        }
    });
})(config.root_dir + '/app/routes');

app.use('/', router);

//Start App
app.listen(process.env.PORT || 4321);

console.log('Start hacking on port 4321');