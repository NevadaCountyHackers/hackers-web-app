'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hasValue = function(val){
    return val && val.length;
};

// Schema
var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [
            hasValue,
            'Name cannot be blank'
        ]
    },
    email: {
        type: String,
        match: [
            /.+\@.+\..+/,
            'Please enter a valid email'
        ]
    },
    meetup : {}
});

mongoose.model('User', UserSchema);
