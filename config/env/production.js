module.exports = {
    db : process.env.MONGOHQ_URL || 'mongodb://localhost/hackers',
    meetup : {
        clientID : '48mjdopl2ic2mukrod5hi3j604',
        clientSecret : '7sm4h8kptknn2t5he0ejeajmlq',
        callbackURL : 'http://nc-hackers.herokuapp.com/auth/meetup/callback',
        redirectUri : 'http://localhost:4321/'
    }
};