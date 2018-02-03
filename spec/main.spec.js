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
        })
    })
    it('Get Request to api/articles/getbyid', () => {
      return request
        .get('/api/articles/5a48e2bfae21fcf62286f091')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.belongs_to).to.equal('football');
        })
    })
    it('Get Request to api/articles/getbyid/comments', () => {
      return request
        .get('/api/articles/5a48e2bfae21fcf62286f091/comments')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.list_of_comments).to.be.an('array');
        })
    })
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
        })
    })
    it('Delete new article', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          return request.delete(`/api/articles/${id}`)
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('object');
              expect(res.body.ok).to.equal(1);
            })
        }
      })
    })
    it('Update article', () => {
      return request.get('/api/articles').then(res => {
        if(res.body.list_of_articles.length > 0) {
          const id =  res.body.list_of_articles[res.body.list_of_articles.length - 1]._id;
          return request.put(`/api/articles/${id}`)
            .send({
              title:'tdd - update',
              body:'tdd - body'
            })
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('object');
              expect(res.body.title).to.equal('tdd - update');
            })
        }
      })
    })
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
                })
            })
        }
      })
    })
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
                })
            })
        }
      })
    })
  });  //  Articles
  describe.only ('topics', ( )=> {

  }); //  Topics
  describe('users', () => {

  }); //  Users
});  //  api