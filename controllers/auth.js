const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function generateToken(user) {
    const timestamp = new Date().getTime();
    
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
}

exports.signin = function(req, res, next) {
    res.status(200).send({token: generateToken(req.user)})
};

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    
    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password...'})
    }
    
    User.findOne({email: email}, function(err, response) {
        if (err) {
            return next(err);
        }
        
        if (response) {
            return res.status(422).send({error: 'Email is in use...'})
        }
        
        const user = new User({
            email   : email,
            password: password
        });
        
        user.save(function(error) {
            
            if (error) {
                return next(error);
            }
            
            res.status(200).send({token: generateToken(user)});
        });
        
    });
};
