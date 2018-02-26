process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const app = require('../server');
const request = require('supertest')(app);

describe('articles', () => {
  let articleId,articleVotes;
  before(() => {
    return request.get('/api/articles').then(res => {
      if(res.body.list_of_articles.length > 0) {
        articleId =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
        articleVotes = res.body.list_of_articles[res.body.list_of_articles.length - 1].votes;
      }
    });
  });
  it('get request to articles', () => {
    return request
      .get('/api/articles')
      .then(res => {
        expect(res.body.list_of_articles).to.be.an('Array');
        expect(res.statusCode).to.equal(200);
        expect(res.ok).to.equal(true);
        expect(res.type).to.equal('application/json');
      });
  });
  it('get request to articles/articleById', () => {
    return request
      .get(`/api/articles/${articleId}`)
      .then(res => {
        expect(res.body).to.be.an('Object');
        expect(res.statusCode).to.equal(200);
        expect(res.ok).to.equal(true);
        expect(res.type).to.equal('application/json');
      });
  });
  it('return error when Request to undefined route', () => {
    return request
      .get('/api/article')
      .then(res => {
        expect(res.accepted).to.equal(false);
        expect(res.statusType).to.equal(4);
        expect(res.statusCode).to.equal(404);
        expect(res.error.path).to.equal('/api/article');
        expect(res.type).to.equal('text/html');
        expect(res.body).to.be.an('object');
      });
  });
  it('Post a new article', () => {
    return request
      .post('/api/articles/add')
      .send({
        'title': 'Tahir',
        'body': null,
        'created_by': 'raza1',
        'belongs_to': 'football',
        'votes': 11
      })
      .set('Accept','application/json')
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.created_by).to.equal('raza1');
      });
  });
  it('Delete new article', () => {
    return request.get('/api/articles').then(res => {
      if(res.body.list_of_articles.length > 0) {
        const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
        return request.delete(`/api/articles/${id}`)
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.ok).to.equal(1);
          });
      }
    });
  });
  it('vote article up', () => {
    return request.put(`/api/articles/${articleId}?vote=up`)
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.votes).to.equal(articleVotes); 
      });
  });
  it('vote article down', () => {
    return request.put(`/api/articles/${articleId}?vote=down`)
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.votes - 1).to.equal(articleVotes);  
      });
  });
  it('return an error if given wrong query', () => {
    return request.put(`/api/articles/${articleId}?vote=own`)
      .then(res =>{
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Please enter a valid vote');                  
      });
  });
});  //  Articles
