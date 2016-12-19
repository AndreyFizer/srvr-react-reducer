/*eslint new-cap:0*/
const router = require('express').Router();
const userController = require('../controllers/user_controller');

module.exports = function() {
    router.get('/', userController.getUsers);
    
    return router;
};
