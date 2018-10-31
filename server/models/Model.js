import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'babel-polyfill';

const debug = require('debug')('database');


dotenv.config();


/**
 * This is model of a resource
 * in the app typical of a database table
 *
 * @export
 * @class Model
 */
export default class Model {
  /**
   *Creates an instance of Model.
   * @param {Array} records - an array of records for the resource
   * @param {Array} fields - an array of attributes defining the resource
   * @memberof Model
   */
  constructor(table, fields) {
    this.table = table;
    this.fields = fields;
    this.connection = new Pool({
      connectionString: process.env.TEST_DATABASE_URL,
    });
    debug('CONNECTING TO DATABASE');
    this.connection.on('connect', () => {
      debug('CONNECTED TO DATABASE');
    });
  }

  /**
   * @returns {Array} - An array of all records for the resource
   * @memberof Model
   */
  async getAll() {
    const queryText = `SELECT * FROM ${this.table}`;
    try {
      const resultSet = await this.connection.query(queryText);
      console.log(resultSet.rows);
      return resultSet;
    } catch (err) {
      console.log(err.stack);
      return err;
    }
  }

  /**
   * @param {*} id - the id of the resource
   * @returns {Object} - the found resource
   * @memberof Model
   */
  findById(id) {
    return this.records.find(item => item.id === id);
  }

  /**
   * This handles the post route for /products
   * @param {Object} data - object containing fields and values of new resource
   * @returns {Object} - the newly created resource
   * @memberof Model
   */
  async create(data) {
    const preparedData = this.prepareData(data);
    const { fieldList, fieldValues } = preparedData;
    const queryText = `INSERT INTO ${this.table} (${fieldList}) VALUES (${fieldValues})`;
    try {
      const resultSet = await this.connection.query(queryText);
      const newResource = resultSet.rows[0];
      return newResource;
    } catch (err) {
      console.log(err.stack);
      return err;
    }
  }

  prepareData(data) {
    data.forEach((item) => {
      console.log(item);
    });
  }

  /**
   * @param {*} id - the id of the resource
   * @param {Object} data - the object with field updates for the resource
   * @returns {Object} - the updated resource
   * @memberof Model
   */
  update(id, data) {
    const foundResource = this.records.find(item => item.id === id);
    const updatedResource = { id: foundResource.id };

    this.fields.forEach((field) => {
      if (field !== 'id') {
        if (data[field]) {
          updatedResource[field] = data[field];
        } else {
          updatedResource[field] = foundResource[field];
        }
      }
    });

    // update the records
    const newRecords = this.records.map((item) => {
      if (item.id === updatedResource.id) {
        return updatedResource;
      }
      return item;
    });
    this.records = newRecords;

    return updatedResource;
  }

  /**
   * @param {*} id - the id of the resource
   * @returns {Boolean} - boolean flag showing success or failure with the delete operation
   * @memberof Model
   */
  delete(id) {
    const newRecords = this.records.filter(item => item.id !== id);

    if (newRecords.length === this.records.length) {
      return false;
    }
    this.records = newRecords;
    return true;
  }

  /**
   * @returns {Object} - the id of the last item on the table
   * @memberof Model
   */
  getLastId() {
    const lastItem = this.records[this.records.length - 1];
    return lastItem.id;
  }
}
