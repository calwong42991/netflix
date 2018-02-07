const controller = require('./Controllers/index.js');
const router = require('express').Router();

router.post('/signup', controller.signup.create);
router.post('/login', controller.login.login);
router.post('/login/redis', controller.log.login);
router.post('/logout/redis', controller.log.logout);

module.exports = router;
