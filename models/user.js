const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email    : {type: String, unique: true, lowercase: true},
    password : {type: String},
    firstName: {type: String, default: ''},
    lastName : {type: String, default: ''},
    role     : {type: Number, default: 1}
});

userSchema.pre('save', function(next) {
    const self = this;
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        
        bcrypt.hash(self.password, salt, null, function(error, hash) {
            if (error) {
                return next(error);
            }
            
            self.password = hash;
            next();
        })
    })
});

userSchema.methods.comparePassword = function(candidatePass, cb) {
    bcrypt.compare(candidatePass, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        
        cb(null, isMatch);
    })
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
