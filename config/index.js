'use strict';

var _ = require('lodash');

var config = {
    app : {
        title : 'Nevada County Hackers',
        description : 'Hacker\'s meetup in Grass Valley and Nevada County'
    }
};

var env = require('./env/' + process.env.NODE_ENV + '.js');

module.exports = _.extend(config, env);