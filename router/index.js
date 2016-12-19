const Auth = require('../controllers/auth');
const passport = require('passport');
const userRouter = require('./user_router')();

require('../services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    
    app.post('/signin', requireSignin, Auth.signin);
    app.post('/signup', Auth.signup);
    app.get('/message', requireAuth, function(req, res, next) {
        res.status(200).send({message: 'Request message !!!'})
    });
    
    app.use('/users', requireAuth, userRouter)
};
