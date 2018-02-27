process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe ('api', () => {
  after(() => {
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  });
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
});  //  api