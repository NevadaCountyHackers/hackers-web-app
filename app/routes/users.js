var ctrl = require('../controllers/users');

module.exports = function (router, passport) {

    router.route('/logout')
        .get(ctrl.logout);

    router.route('/auth/meetup')
        .get(passport.authenticate('meetup'));

    router.route('/auth/meetup/callback')
        .get(passport.authenticate('meetup', {
            failureRedirect: '#!/login'
        }), ctrl.authCallback);

};