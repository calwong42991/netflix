const redis = require('redis');
const moment = require('moment');

const cache = redis.createClient({host: 'test_redis'});

cache.on('error', error => console.log('Error', error));

const login = ({user_id, region}) => {
  const query = ["user_id", `${user_id}`, "region", `${region}`, "login", "true", "time", `${moment().format('MMMM Do YYYY, h:mm:ss a')}`];
  return cache.hmset("Login", query, function(err, res){
    if(err){
      console.log(err);
    } else {
      console.log('SAVED', res);
      return res;
    }
  })
}

const logout = ({user_id, region}) => {
  const query = ["user_id", `${user_id}`, "region", `${region}`, "login", "false", "time", `${moment().format('MMMM Do YYYY, h:mm:ss a')}`];
  return cache.hmset("Login", query, function(err, res){
    if(err){
      console.log(err);
    } else {
      console.log('SAVED', res);
      return res;
    }
  })
}

const getLog = () => {
  return cache.hgetallAsync("Login")
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

exports.login = login;
exports.logout = logout;
exports.getLog = getLog;
