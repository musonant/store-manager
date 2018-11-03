// import { expect, request } from './test.includes';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../app';

import productTests from './products.test';
import salesTests from './sales.test';

const request = supertest(app);

describe('All test cases for Store Manager API', () => {
  describe('test case for loading application home page', () => {
    it('Should load application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Welcome to Store Manager API',
          });
          done();
        });
    });
    it('Should load API Home', (done) => {
      request.get('/api/v1')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Store Manger API V1');
          done();
        });
    });
  });
  describe('test case for loading unavailable routes', () => {
    it('Should load API Home', (done) => {
      request.get('/wrongRoute')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Page not found');
          done();
        });
    });
  });

  productTests();
  salesTests();
});
