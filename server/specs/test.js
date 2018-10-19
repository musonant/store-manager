import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const { expect } = chai;
const request = supertest(app);

describe('All test cases for Store Manager API', () => {
  describe('test case for loading application home page', () => {
    it('Should load application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Welcome to Store Manager API'
          });
          if (err) done(err);
          done();
        });
    });
    it('Should load API Home', (done) => {
      request.get('/api/v1')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Store Manger API V1');
          if (err) done(err);
          done();
        });
    });
  });
  describe('test case for loading products page', () => {
    it('Should return all products', (done) => {
      request.get('/api/v1/products')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('success');
          if (err) done(err);
          done();
        });
    });
  });
});
