var ctrl = require('../controllers/events');

module.exports = function (router, passport) {

    router.route('/api/events')
        .get(ctrl.list);

};