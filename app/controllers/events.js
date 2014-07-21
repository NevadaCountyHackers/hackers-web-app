var meetup = require('../libraries/meetup');

exports.list = function(req, res){
    meetup.events(req.user.accessToken)
        .then(function(data){
            res.json(data.results);
        }, function(err){
            console.log('Error: ', err);
            res.json(500, {
                error : err
            });
        });
};