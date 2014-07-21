'use strict';

var mongoose = require('mongoose'),
    MeetupStrategy = require('passport-meetup').Strategy,
    User = mongoose.model('User'),
    config = require('./config');

module.exports = function(passport) {

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, function(err, user) {
            done(err, user);
        });
    });

    // Use Meetup strategy
    passport.use(new MeetupStrategy({
            consumerKey: config.meetup.clientID,
            consumerSecret: config.meetup.clientSecret,
            callbackURL: config.meetup.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            User.findOne({
                'meetup.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                user.accessToken = token;
                var profileInfo;
                if(profile._json && profile._json.results && profile._json.results[0]){
                    profileInfo = profile._json.results[0];
                }

                if (!user) {
                    console.log(profileInfo);
                    user = new User({
                        name: profileInfo.name,
                        email: profileInfo.email,
                        meetup: profileInfo,
                        accessToken: token
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    user.meetup = profileInfo;
                    user.save(function(){
                        return done(err, user);
                    });
                }
            });
        }
    ));

};
