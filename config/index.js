'use strict';

var _ = require('lodash');

var root_dir = __dirname + '/..';

var config = {
    app : {
        title : 'Nevada County Hackers',
        description : 'Hacker\'s meetup in Grass Valley and Nevada County',
        footer : 'Hack on! 2014.'
    },
    secret : 'JSIDO*HACKERS4LIFE1BUSDIJNUI@*',
    sessionCollection : 'sessions',
    root_dir : root_dir
};

var env = require('./env/' + process.env.NODE_ENV + '.js');

module.exports = _.extend(config, env);