process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const app = require('../server');
const request = require('supertest')(app);
describe ('api', () => {
  describe('articles', () => {
    it('Responds to GET request with an array of articles and 200 status', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body.list_of_articles).to.be.an('Array');
        });
    });
    it('return error when Request to undefined route', () => {
      return request
        .get('/api/article')
        .expect(404)
        .then(res => {
          expect(res.body).to.be.an('object');
        });
    });
    it('Post a new article', () => {
      return request
        .post('/api/articles/add')
        .send({
          "title": "Tahir",
          "body": null,
          "created_by": "raza1",
          "belongs_to": "football",
          "votes": 11
        })
        .set('Accept','application/json')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.created_by).to.equal('raza1');
        });
    });
    it('Delete new article', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          return request.delete(`/api/articles/${id}`)
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('object');
              expect(res.body.ok).to.equal(1);
            });
        }
      });
    });
    it('vote article up', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          const votes = res.body.list_of_articles[res.body.list_of_articles.length - 1].votes;
          return request.put(`/api/articles/${id}?vote=up`)
            .expect(200)
            .then(() => {
              return request.get(`/api/articles/${id}`)
                .expect(200)
                .then(res =>{
                  expect(res.body).to.be.an('object');
                  expect(res.body.votes).to.equal(votes+1);                  
                });
            });
        }
      });
    });
    it('vote article down', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          const votes = res.body.list_of_articles[res.body.list_of_articles.length - 1].votes;
          return request.put(`/api/articles/${id}?vote=down`)
            .expect(200)
            .then(() => {
              return request.get(`/api/articles/${id}`)
                .expect(200)
                .then(res =>{
                  expect(res.body).to.be.an('object');
                  expect(res.body.votes).to.equal(votes-1);                  
                });
            });
        }
      });
    });
    it('return an error if given wrong query', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          return request.put(`/api/articles/${id}?vote=own`)
            .then(res =>{
              expect(res.body).to.be.an('object');
              expect(res.body.error).to.equal('Please enter a valid vote');                  
            });
            
        }
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
    it('Through a error if resource not found', () => {
      return request
        .get('/api/users/northcoders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({ error: 'Resource not found' });
        });
    });
  }); //  Users
  describe('comments', ()=>{  
    it('Get Request to api/articles/getbyid/comments', () => {
      return request
        .get('/api/articles/5a48e2bfae21fcf62286f091/comments')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.list_of_comments).to.be.an('array');
        });
    }); 
    it('throw an error if rout does not exists', () => {
      return request
        .get('/api/articles/5a48e2bfae21fcf62286f091/comment')
        .expect(500)
        .then(res => {
          expect(res.body).to.be.an('object');
        });
    }); 
    it('vote comment up', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const article_id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          return request.get(`/api/articles/${article_id}/comments`)
            .then(res => {
              if(res.body.list_of_comments.length > 0) {
                const comment_id =  res.body.list_of_comments[res.body.list_of_comments.length - 1]._id;
                const votes = res.body.list_of_comments[res.body.list_of_comments.length - 1].votes;
                return request.put(`/api/articles/${article_id}/${comment_id}?vote=up`)
                  .expect(200)
                  .then(() => {
                    return request.get(`/api/articles/${article_id}/${comment_id}`)
                      .expect(200)
                      .then(res =>{
                        expect(res.body).to.be.an('object');
                        expect(res.body.votes).to.equal(votes+1);                  
                      });
                  });
              }
            });
        }
      });
    });
    it('vote comment down', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const article_id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          return request.get(`/api/articles/${article_id}/comments`)
            .then(res => {
              if(res.body.list_of_comments.length > 0) {
                const comment_id =  res.body.list_of_comments[res.body.list_of_comments.length - 1]._id;
                const votes = res.body.list_of_comments[res.body.list_of_comments.length - 1].votes;
                return request.put(`/api/articles/${article_id}/${comment_id}?vote=down`)
                  .expect(200)
                  .then(() => {
                    return request.get(`/api/articles/${article_id}/${comment_id}`)
                      .expect(200)
                      .then(res =>{
                        expect(res.body).to.be.an('object');
                        expect(res.body.votes).to.equal(votes-1);                  
                      });
                  });
              }
            });
        }
      });
    });
    it('return error if wrong query given', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const article_id =  res.body.list_of_articles[0]._id;
          return request.get(`/api/articles/${article_id}/comments`)
            .then(res => {
              if(res.body.list_of_comments.length > 0) {
                const comment_id =  res.body.list_of_comments[0]._id;
                return request.put(`/api/articles/${article_id}/${comment_id}?pote=down`)
                  .expect(500)
                  .then((res) => {
                    expect(res.body).to.eql({'error':'Please enter a valid url/query'});
                  });
              }
            });
        }
      });
    });
    
  });  //  comments
});  //  api