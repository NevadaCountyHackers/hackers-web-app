'use strict';

var ctrl = require('../controllers');
module.exports = function(router){

    router.route('/')
        .get(ctrl.home);

};