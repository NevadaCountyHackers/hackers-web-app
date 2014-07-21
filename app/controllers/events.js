var meetup = require('../libraries/meetup');

exports.list = function(req, res){
    var accessToken = req.user && req.user.accessToken ? req.user.accessToken : null;
    meetup.events(accessToken)
        .then(function(data){
            res.json(data.results);
        }, function(err){
            console.log('Error: ', err);
            res.json(500, {
                error : err
            });
        });
};