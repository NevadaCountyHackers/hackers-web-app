var Meetup = require('meetup'),
    _ = require('lodash'),
    Q = require('q'),
    config = require('../../config/config');

function generateURL(api, params) {
    var urlParams = Object.keys(params).map(function (key) {
        return key + '=' + params[key];
    }).join('&');
    return api + '?' + urlParams;
}

function init(accessToken){
    return new Meetup({
        clientId : config.meetup.clientID,
        clientSecret : config.meetup.clientSecret,
        redirectUri : config.meetup.redirectUri,
        accessToken : accessToken
    });
}

function convertJSON(json){
    var obj = {};
    try{
        if(typeof json === 'string'){
            obj = JSON.parse(json);
        }else{
            obj = json;
        }
    }catch(e){}

    return obj;
}

var api = {
    events: function (accessToken, params) {
        var deferred = Q.defer();
        var defaults = {
            group_urlname: config.group_urlname,
            per_page: 20
        };
        params = _.extend(defaults, params);
        var api = generateURL('/2/events', params);

        init(accessToken).get(api,
            function(err, data){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(convertJSON(data));
                }
            });

        return deferred.promise;
    }
};

module.exports = api;