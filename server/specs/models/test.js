import { describe, it } from 'mocha';
import { expect } from 'chai';
import Model from '../../models/Model';
import User from '../../models/User';
import Sales from '../../models/Sales';
import Product from '../../models/Product';
import userSchema from '../../migrations/users';
import productSchema from '../../migrations/products';
import saleSchema from '../../migrations/sales';


const model = new Model(userSchema.records, userSchema.fields, userSchema.fieldTypes);

const modelTests = () => {
  describe('Test cases for the Model Class', () => {
    it('should return all records', async () => {
      const records = await model.getAll();
      expect(records.length > 0).to.equal(true);
    });
    it('should create a record', async () => {
      const newRecord = { userType: 'store_attendant', email: 'new_attendant@store.demo' };
      const record = await model.create(newRecord);
      expect(record.email).to.equal('new_attendant@store.demo');
    });
    it('should update a record', async () => {
      // create new record first.
      const newRecordData = { userType: 'store_attendant', email: 'new_attendant@store.demo' };
      const record = await model.create(newRecordData);
      // update the created record
      const updateData = { email: 'musonant1@store.demo' };
      const updatedRecord = await model.update(record.id, updateData);
      expect(updatedRecord.email).to.equal('musonant1@store.demo');
      // expect(updatedRecord.createdAt).to.equal(record.createdAt);
    });
    it('should retrieve a record', async () => {
      // create new record first.
      const newRecordData = { userType: 'store_attendant', email: 'new_attendant@store.demo' };
      const record = await model.create(newRecordData);
      // retrieve the created record
      const returnedRecord = await model.findById(record.id);
      expect(returnedRecord.email).to.equal(record.email);
      expect(returnedRecord.createdAt).to.equal(record.createdAt);
    });
    it('should delete a record', async () => {
      // create new record first.
      const newRecordData = { userType: 'store_attendant', email: 'new_attendant@store.demo' };
      const record = await model.create(newRecordData);
      // delete the created record
      const result = model.delete(record.id);
      expect(result).to.equal(true);
    });
    it('should fail to delete a record not found', () => {
      const result = model.delete(0);
      expect(result).to.equal(false);
    });


    it('All App Models should instantiate with no errors', () => {
      const sale = new Sales(saleSchema.records, saleSchema.fields, saleSchema.fieldTypes);
      const user = new User(userSchema.records, userSchema.fields, userSchema.fieldTypes);
      const product = new Product(
        productSchema.records,
        productSchema.fields,
        productSchema.fieldTypes,
      );
      expect(sale).to.not.equal(undefined);
      expect(user).to.not.equal(undefined);
      expect(product).to.not.equal(undefined);
    });
  });
};

export default modelTests;
