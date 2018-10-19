// import { expect, request } from './test.includes';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

const wrongToken = 'OPsdecedsaec00e2349__dL';
const attendantToken = 'OPsdecedsaec00e23490LdL';
// const wrongAttendantToken = 'KLcxdwedsaecd3e23490LdL';
// const attendantSaleId = 1;
const ownerToken = 'xcmr2ewesaec00e23490LdL';

const productTests = () => {
  describe('test case for getting products', () => {
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
  describe('test case for creating products', () => {
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
    it('Should not create product with wrong token sent', (done) => {
      request.post('/api/v1/products')
        .set('x-access-token', wrongToken)
        .send(productData)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('wrong token');
          if (err) done(err);
          done();
        });
    });
    it('Should not create product with token missing from request', (done) => {
      request.post('/api/v1/products')
        .send(productData)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('missing token');
          if (err) done(err);
          done();
        });
    });
    it('Should create a products with satisfactory requirements', (done) => {
      request.post('/api/v1/products')
        .set('x-access-token', ownerToken)
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
};

export default productTests;
