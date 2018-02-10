const db = require('../database/index.js');
const redis = require('../Cache/redis.js');

var obj = {
  user_id: 266118,
  profile_name: 'Landen_Schulist68',
  password: 'Bh5_SO6jqt5nc4P',
  email: 'calwong@gmail.com',
  region: 'North America',
  preferences: 'comedy',
}

// var promise1 = db.fake.createUser();
// var promise2 = db.fake.createVideoSaved();
// var promise3 = db.fake.createVideoWatched();
//
// Promise.all([promise1, promise2, promise3]).then(() => {
//   console.log('done');
// })

//db.user.create(obj)
//db.user.test(obj);
//db.login.authenticate(obj);
//db.login.updateRegion(obj);
//db.login.getVideoSaved(obj);
//db.login.getVideoWatched(obj);
//db.login.login(obj);
// redis.login(obj);
// redis.logout(obj);
// redis.getLog();
