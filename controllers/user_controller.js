const User = require('../models/user');

exports.getUsers = function(req, res, next) {
    User.find({}).exec(function(err, users) {
        if (err) {
            return next(err);
        }
        
        res.status(200).send({users: users});
    })
};
