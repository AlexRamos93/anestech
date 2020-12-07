require('dotenv').config();
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

const { User } = require('../app/models');

const params = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = function () {
    let strategy = new Strategy(params, async function (payload, done) {
        var user = await User.findOne({ where: { id: payload.id } });
        if (user) {
            return done(null, { id: user.id });
        } else {
            return done(new Error('User not found'), null);
        }
    });

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false });
        },
    };
};
