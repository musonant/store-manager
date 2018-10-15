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
  });
});
