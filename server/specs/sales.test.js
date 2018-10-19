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

const salesTests = () => {
  describe('Test cases for Sales', () => {
    describe('Test case for Create Sales', () => {
      const salesData = {
        customerName: 'James Arthur',
        totalPay: 2300,
        orders: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 }
        ]
      };
      it('Should not create sales if not authenticated', (done) => {
        request.post('/api/v1/sales')
          .send(salesData)
          .expect(401)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            if (err) done(err);
            done();
          });
      });
      it('Should not create sales with wrong token', (done) => {
        request.post('/api/v1/sales')
          .set('x-access-token', wrongToken)
          .send(salesData)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('wrong token');
            if (err) done(err);
            done();
          });
      });
      it('Should not create sales if not store attendant', (done) => {
        request.post('/api/v1/sales')
          .set('x-access-token', ownerToken)
          .send(salesData)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('you have to be a store attendant to make this request');
            if (err) done(err);
            done();
          });
      });

      it('Should create sales with satisfactory requirements', (done) => {
        request.post('/api/v1/sales')
          .set('x-access-token', attendantToken)
          .send(salesData)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data.products.length).to.equal(2);
            expect(res.body.data.totalPay).to.equal(2300);
            // if (err) done(err);
            done(err);
          });
      });
    });
  });
};

export default salesTests;
