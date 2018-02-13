const expect  = require('chai').expect;
const request = require('request');
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server/server');

describe('Main Page', function() {
  it('sign up', function(done) {
    request('http://localhost:8080/api/signup' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Login', function(done) {
    request('http://localhost:8080/api/login' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Login with time stamp', function(done) {
    request('http://localhost:8080/api/login/redis' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Logout with time stamp', function(done) {
    request('http://localhost:8080/api/logout/redis' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('Save Videos', function() {
  it('Saved Videos By User', function(done) {
    request('http://localhost:8080/api/saved' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Update Saved Video Time', function(done) {
    request('http://localhost:8080/api/saved/update' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('Watched Videos', function() {
  it('Watched Videos By User', function(done) {
    request('http://localhost:8080/api/watched' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Update Watched Videos Rating', function(done) {
    request('http://localhost:8080/api/watched/update' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
