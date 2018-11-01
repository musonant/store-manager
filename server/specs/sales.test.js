import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

const wrongToken = 'OPsdecedsaec00e2349__dL';
const attendantToken = 'OPsdecedsaec00e23490LdL';
const wrongAttendantToken = 'KLcxdwedsaecd3e23490LdL';
const attendantSaleId = 1;
const ownerToken = 'xcmr2ewesaec00e23490LdL';

const salesTests = () => {
  describe('Test cases for Sales', () => {
    describe('Test case for Create Sales', () => {
      const salesData = {
        customerName: 'James Arthur',
        totalPay: 2300,
        orders: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 },
        ],
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
      it('Should return error when request is missing orders', (done) => {
        const badSalesData = { customerName: 'James Arthur', totalPay: 2300 };
        request.post('/api/v1/sales')
          .set('x-access-token', attendantToken)
          .send(badSalesData)
          .expect(400)
          .end((err, res) => {
            expect(res.body.message).to.equal('Your request is missing orders');
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
    describe('Test case for get all sales', () => {
      it('Should not get sales if not authenticated', (done) => {
        request.get('/api/v1/sales')
          .expect(401)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            if (err) done(err);
            done();
          });
      });
      it('Should not get all sales with wrong token', (done) => {
        request.get('/api/v1/sales')
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('wrong token');
            if (err) done(err);
            done();
          });
      });
      it('Should not get all sales if not store owner', (done) => {
        request.get('/api/v1/sales')
          .set('x-access-token', attendantToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('you have to be a store owner to make this request');
            if (err) done(err);
            done();
          });
      });
      it('Should return all sales with satisfactory requirements', (done) => {
        request.get('/api/v1/sales')
          .set('x-access-token', ownerToken)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data.length > 0).to.equal(true);
            done(err);
          });
      });
    });
    describe('Test case for get a specific sale', () => {
      it('Should not get sale record if not authenticated', (done) => {
        request.get(`/api/v1/sales/${attendantSaleId}`)
          .expect(401)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            if (err) done(err);
            done();
          });
      });
      it('Should not get sale record with wrong token', (done) => {
        request.get(`/api/v1/sales/${attendantSaleId}`)
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('wrong token');
            if (err) done(err);
            done();
          });
      });
      it('Should not get sale record if not store owner AND not sale creator', (done) => {
        request.get(`/api/v1/sales/${attendantSaleId}`)
          .set('x-access-token', wrongAttendantToken)
          .expect(403)
          .end((err, res) => {
            expect(res.body.message).to.equal('You cannot access this resource');
            if (err) done(err);
            done();
          });
      });
      it('Should return error on sale not found', (done) => {
        request.get('/api/v1/sales/0')
          .set('x-access-token', attendantToken)
          .expect(404)
          .end((err, res) => {
            expect(res.body.message).to.equal('Not Found');
            done(err);
          });
      });
      it('Should return sale record on satisfactory requirements', (done) => {
        request.get(`/api/v1/sales/${attendantSaleId}`)
          .set('x-access-token', attendantToken)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data.id).to.equal(attendantSaleId);
            done(err);
          });
      });
    });
  });
};

export default salesTests;
