const controller = require('./Controllers/index.js');
const router = require('express').Router();

router.get('/signup', controller.signup.create);
router.get('/login', controller.login.login);
router.get('/login/redis', controller.log.login);
router.get('/logout/redis', controller.log.logout);

module.exports = router;
