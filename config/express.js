'use strict';

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var consolidate    = require('consolidate');
var compression    = require('compression');
var config         = require('./index.js');
var session        = require('express-session');
var mongoStore     = require('mean-connect-mongo')(session);

module.exports = function (app, db) {
    app.use(compression({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Static Files
    app.use(express.static(config.root_dir + '/public'));

    app.set('views', config.root_dir + '/app/views');

    app.engine('html', consolidate.swig);

    app.locals.app = config.app;
    app.locals.appjson = JSON.stringify(config.app);

    // Enable JSONP
    app.enable('jsonp callback');

    // Fix for swig crash
    app.locals.cache = 'memory';

    // Log all requests to the console
    app.use(morgan('dev'));

    //Body Parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Allow Override for PUT and DELETE
    app.use(methodOverride());

    app.use(session({
        secret: config.secret,
        store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));
};