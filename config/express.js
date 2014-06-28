'use strict';

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

module.exports = function (app) {
    // Static Files
    app.use(express.static(__dirname + '/../public'));

    // Log all requests to the console
    app.use(morgan('dev'));

    //Body Parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Allow Override for PUT and DELETE
    app.use(methodOverride());
};