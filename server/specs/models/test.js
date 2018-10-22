import { describe } from 'mocha';
import { expect } from 'chai';
import Model from '../../models/Model';
import User from '../../models/User';
import Sales from '../../models/Sales';
import Product from '../../models/Product';


const records = [{ id: 1, username: 'musonant' }, { id: 2, username: 'musonant2' }];
const fields = ['id', 'username'];
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
      const resourceId = records[0].id;
      const updatedRecord = model.update(resourceId, updateData);
      expect(updatedRecord.username).to.equal('musonant1_v2');
    });
    it('should retrieve a record', () => {
      const record = records[0];
      const returnedRecord = model.findById(record.id);
      expect(returnedRecord).deep.equal(record);
    });
    it('should delete a record', () => {
      const record = records[0];
      const result = model.delete(record.id);
      expect(result).to.equal(true);
    });
    it('should fail to delete a record not found', () => {
      const result = model.delete(0);
      expect(result).to.equal(false);
    });


    describe('All App Models should instantiate with no errors', () => {
      const sale = new Sales();
      const user = new User();
      const product = new Product();
      expect(sale).to.not.equal(undefined);
      expect(user).to.not.equal(undefined);
      expect(product).to.not.equal(undefined);
    });
  });
};

export default modelTests;
