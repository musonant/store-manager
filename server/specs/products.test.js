import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

const wrongToken = 'OPsdecedsaec00e2349__dL';

const owner = {
  password: 'owner@store',
  email: 'owner@store.demo',
};
const attendant = {
  password: 'attendant1@store',
  email: 'attendant1@store.demo',
};
let ownerToken;
let attendantToken;
const productTests = () => {
  describe('Test cases for Products Resource', () => {
    before((done) => {
      request.post('/api/v1/auth/login')
        .send({ email: owner.email, password: owner.password })
        .end((err, res) => {
          ownerToken = res.body.token;
        });
      request.post('/api/v1/auth/login')
        .send({ email: attendant.email, password: attendant.password })
        .end((err, res) => {
          attendantToken = res.body.token;
          done();
        });
    });
    describe('Test cases for getting products', () => {
      it('Should return all products', (done) => {
        request.get('/api/v1/products')
          .set('Content-Type', 'application/json')
          .expect(200)
          .end((err, res) => {
            expect(res.body.message).to.equal('success');
            done();
          });
      });
    });
    describe('Test cases for creating products', () => {
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
            done();
          });
      });
      it('Should not create product with wrong token sent', (done) => {
        request.post('/api/v1/products')
          .set('x-access-token', wrongToken)
          .send(productData)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
            done();
          });
      });
      it('Should not create product with token missing from request', (done) => {
        request.post('/api/v1/products')
          .send(productData)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('missing token');
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
            done();
          });
      });
    });
    describe('Test cases for getting a product', () => {
      it('Should not return products on request missing token', (done) => {
        request.get('/api/v1/products/1')
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('missing token');
            done();
          });
      });
      it('Should not return product on wrong token sent', (done) => {
        request.get('/api/v1/products/1')
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
            done();
          });
      });
      let newProduct = {};
      before((done) => {
        const productData = {
          name: 'New Book',
          description: 'A new one',
          quantityInStock: 23,
          price: 2000,
          categoryId: 1,
        };
        request.post('/api/v1/products')
          .set('x-access-token', ownerToken)
          .send(productData)
          .end((err, res) => {
            newProduct = res.body.data;
            done();
          });
      });
      it('Should return product on satisfactory requirements', (done) => {
        newProduct.id = 1;
        request.get(`/api/v1/products/${newProduct.id}`)
          .set('x-access-token', attendantToken)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data.name).to.equal('Book');
            done();
          });
      });
      it('Should return an error on product not found', (done) => {
        newProduct.id = 0;
        request.get(`/api/v1/products/${newProduct.id}`)
          .set('x-access-token', attendantToken)
          .expect(404)
          .end((err, res) => {
            expect(res.body.message).to.equal('Not Found');
            done();
          });
      });
    });
  });
};

export default productTests;
