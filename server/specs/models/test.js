import { describe } from 'mocha';
import { expect } from 'chai';
import Model from '../../models/Model';
import User from '../../models/User';
import Sales from '../../models/Sales';
import Product from '../../models/Product';
import userSchema from '../../migrations/users';
import productSchema from '../../migrations/products';
import saleSchema from '../../migrations/sales';


const records = [
  { id: 1, username: 'musonant', createdAt: new Date() },
  { id: 2, username: 'musonant2', createdAt: new Date() }
];
const fields = ['id', 'username', 'createdAt'];
const model = new Model(records, fields);

const modelTests = () => {
  describe('Test cases for the Model Class', () => {
    it('should return all records', () => {
      expect(model.getAll()).deep.equal(records);
    });
    it('should create a record', () => {
      const newRecord = { username: 'musonant3' };
      expect(model.create(newRecord).username).to.equal('musonant3');
    });
    it('should update a record', () => {
      const updateData = { username: 'musonant1_v2' };
      const record = Object.create(records[1]);
      const updatedRecord = model.update(record.id, updateData);
      expect(updatedRecord.username).to.equal('musonant1_v2');
      expect(updatedRecord.createdAt).to.equal(record.createdAt);
    });
    it('should retrieve a record', () => {
      const record = Object.create(records[0]);
      const returnedRecord = model.findById(record.id);
      expect(returnedRecord.username).to.equal(record.username);
      expect(returnedRecord.createdAt).to.equal(record.createdAt);
    });
    it('should delete a record', () => {
      const record = Object.create(records[0]);
      const result = model.delete(record.id);
      expect(result).to.equal(true);
    });
    it('should fail to delete a record not found', () => {
      const result = model.delete(0);
      expect(result).to.equal(false);
    });


    it('All App Models should instantiate with no errors', () => {
      const sale = new Sales(saleSchema.records, saleSchema.fields);
      const user = new User(userSchema.records, userSchema.fields);
      const product = new Product(productSchema.records, productSchema.fields);
      expect(sale).to.not.equal(undefined);
      expect(user).to.not.equal(undefined);
      expect(product).to.not.equal(undefined);
    });
  });
};

export default modelTests;
