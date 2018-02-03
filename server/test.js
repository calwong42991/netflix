const db = require('../database/index.js');

var obj = {
  user_id: 5,
  profile_name: 'Pansy_Prosacco92',
  password: '63U0HfyDNOarnYm',
  email: 'calwong@gmail.com',
  region: 'north america',
  preferences: 'comedy'
}

var promise1 = db.fake.createUser();
var promise2 = db.fake.createVideoSaved();
var promise3 = db.fake.createVideoWatched();

Promise.all([promise1, promise2, promise3]).then(() => {
  console.log('done');
})

//db.user.create(obj)
//db.user.test(obj);
//db.login.authenticate(obj);
//db.login.updateRegion(obj);
