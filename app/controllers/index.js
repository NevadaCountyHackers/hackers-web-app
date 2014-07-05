'use strict';

exports.home = function(req, res){
    res.render('index.html', {
        user : req.user
    });
};