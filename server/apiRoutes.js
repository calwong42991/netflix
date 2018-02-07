const controller = require('./Controllers/index.js');
const router = require('express').Router();

router.post('/signup', controller.signup.create);
router.post('/login', controller.login.login);

router.post('/login/redis', controller.log.login);
router.post('/logout/redis', controller.log.logout);

router.post('/saved', controller.save.create);
router.get('/saved', controller.save.getAllVideoSaved);
router.post('/saved/update', controller.save.updateSavedTime);


router.post('/watched', controller.watch.create);
router.get('/watched', controller.watch.getAllVideoWatched);
router.post('/watched/update', controller.watch.updateRating);


module.exports = router;
