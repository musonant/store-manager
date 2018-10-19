import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import modelTests from './models/test';

// Run Tests for the Model Class and Data Model Classes
modelTests();

// const wrongToken = 'OPsdecedsaec00e2349__dL';
const attendantToken = 'OPsdecedsaec00e23490LdL';
// const wrongAttendantToken = 'KLcxdwedsaecd3e23490LdL';
// const attendantSaleId = 1;
const ownerToken = 'xcmr2ewesaec00e23490LdL';

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
  describe('test case for creating products page', () => {
    const productData = {
      name: 'New Book',
      description: 'A new one',
      quantityInStock: 23,
      price: 2000,
      categoryId: 1,
    };
    it('Should not allow attendant to create products', (done) => {
      request.post('/api/v1/products')
        .set('x-access-token', attendantToken)
        .send(productData)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('you have to be a store owner to make this request');
          if (err) done(err);
          done();
        });
    });
    it('Should create a products', (done) => {
      request.post('/api/v1/products')
        .set('x-access-token', 'xcmr2ewesaec00e23490LdL')
        .send(productData)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('success');
          expect(res.body.data.name).to.equal('New Book');
          if (err) done(err);
          done();
        });
    });
  });
});
