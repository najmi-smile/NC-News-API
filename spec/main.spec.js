process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const app = require('../server');
const request = require('supertest')(app);
describe ('api', () => {
  describe('topics', ( )=> {
    it('Responds with an object of topics and 200 status', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
        });
    });
    it('respond with error if route does not exist', () => {
      return request
        .get('/api/topic')
        .expect(404)
        .then(res => {
          expect(res.body).to.be.an('object');
        });
    });
    it('Get Request to api/topics/:slug/articles', () => {
      return request
        .get('/api/topics/cooking/articles')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.list_of_articles).to.be.an('array');
        });
    });
  }); //  Topics
  describe('users', () => {
    it('Responds with an array of users and 200 status', () => {
      return request
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
        });
    });
    it('Throw an error if resource not found', () => {
      return request
        .get('/api/users/northcoders')
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({ error: 'Resource not found' });
        });
    });
  }); //  Users
});  //  api