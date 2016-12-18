const User = require('../models/user');
const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOption = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOption, function(email, password, done) {
    User.findOne({email: email}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        
        user.comparePassword(password, function(error, isMatch) {
            if (error) {
                return done(error);
            }
            if (!isMatch) {
                return done(null, false);
            }
            
            done(null, user);
        });
    })
});

const jwtOption = {
    jwtFromRequest: jwtExtract.fromHeader('authorization'),
    secretOrKey   : config.secret
};

const jwtLogin = new JwtStrategy(jwtOption, function(payload, done) {
    User.findById(payload.sub, function(err, user) {
        if (err) {
            return done(err, false);
        }
        
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

passport.use(jwtLogin);
passport.use(localLogin);

