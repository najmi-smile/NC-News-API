process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const app = require('../server');
const request = require('supertest')(app);

describe('comments', () => {  
  let articleId,commentId,commentVotes;
  before(() => {
    return request.get('/api/articles').then(res => {
      articleId =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
      return request.get(`/api/articles/${articleId}/comments`)
        .then(res => {
          commentId =  res.body.list_of_comments[res.body.list_of_comments.length - 1]._id;
          commentVotes = res.body.list_of_comments[res.body.list_of_comments.length - 1].votes;
        });
    });
  });
  it('Get Request to api/articles/getbyid/comments', () => {
    return request
      .get(`/api/articles/${articleId}/comments`)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.list_of_comments).to.be.an('array');
      });
  }); 
  it('throw an error if rout does not exists', () => {
    return request
      .get(`/api/articles/${articleId}/comment`)
      .expect(500)
      .then(res => {
        expect(res.body).to.be.an('object');
      });
  }); 
  it('vote comment up', () => {
    return request.put(`/api/articles/${articleId}/${commentId}?vote=up`)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.votes).to.equal(commentVotes);                 
      });
  });
  it('vote comment down', () => {
    return request.put(`/api/articles/${articleId}/${commentId}?vote=down`)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.votes - 1).to.equal(commentVotes);                 
      });
  });
  it('return error if wrong query given', () => {
    return request.put(`/api/articles/${articleId}/${commentId}?vote=own`)
      .then(res =>{
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Please enter a valid vote');                  
      });
  });
  
});  //  comments