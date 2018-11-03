import dotenv from 'dotenv';
import dbConnection from '../database/config';

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
  constructor(table, fields, fieldTypes) {
    this.table = table;
    this.fields = fields;
    this.fieldTypes = fieldTypes;
    this.connection = dbConnection;
  }

  /**
   * @returns {Array} - An array of all records for the resource
   * @memberof Model
   */
  async getAll() {
    const queryText = `SELECT * FROM ${this.table}`;
    try {
      const resultSet = await this.connection.query(queryText);
      return resultSet.rows;
    } catch (err) {
      debug('query_error ', err.stack);
      return err.stack;
    }
  }

  /**
   * @param {Number} id - the id of the resource
   * @returns {Object} - the found resource
   * @memberof Model
   */
  async findById(id) {
    const queryText = `SELECT * FROM ${this.table} WHERE id = ${id}`;
    try {
      const resultSet = await this.connection.query(queryText);
      return resultSet.rows[0];
    } catch (err) {
      debug('query_error ', err.stack);
      return err.stack;
    }
  }

  /**
   * @param {Object} data - object of attribute: value
   * @returns {Object} - the found resource
   * @memberof Model
   */
  async findByFieldName(data) {
    const queryText = `SELECT * FROM ${this.table} WHERE "${data.fieldName}" = '${data.value}'`;
    try {
      const resultSet = await this.connection.query(queryText);
      return resultSet.rows[0];
    } catch (err) {
      debug('query_error ', err.stack);
      return err.stack;
    }
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
    const queryText = `INSERT INTO ${this.table} (${fieldList}) VALUES (${fieldValues}) RETURNING *`;
    try {
      const resultSet = await this.connection.query(queryText);
      const newResource = resultSet.rows[0];
      return newResource;
    } catch (err) {
      debug('query_error ', err.stack);
      return err.stack;
    }
  }


  /**
   *
   * @param {Object} data - object of table fields: values
   */
  prepareData(data) {
    const fieldList = [];
    const fieldValues = [];
    for (let field in data) {
      if (this.fields.includes(field)) {
        let value;
        if (this.fieldTypes[field] !== 'integer') {
          value = `'${data[field]}'`;
        } else {
          value = data[field];
        }

        field = `"${field}"`;

        fieldList.push(field);
        fieldValues.push(value);
      }
    }

    const preparedData = { fieldList, fieldValues };
    return preparedData;
  }

  /**
   * @param {*} id - the id of the resource
   * @param {Object} data - the object with field updates for the resource
   * @returns {Object} - the updated resource
   * @memberof Model
   */
  async update(id, data) {
    const preparedUpdateSet = this.prepareUpdateData(data);
    const queryText = `UPDATE ${this.table} ${preparedUpdateSet} WHERE id = ${id} RETURNING *`;

    try {
      const resultSet = await this.connection.query(queryText);
      const updatedResource = resultSet.rows[0];
      return updatedResource;
    } catch (err) {
      debug('query_error ', err.stack);
      return err.stack;
    }
  }

  prepareUpdateData(data) {
    let preparedUpdateSet = 'SET ';
    for (const field in data) {
      if (this.fields.includes(field)) {
        let updateFieldSet = '';
        if (preparedUpdateSet !== 'SET ') {
          updateFieldSet = ', ';
        }
        if (this.fieldTypes[field] !== 'integer') {
          updateFieldSet += `"${field}" = '${data[field]}'`;
        } else {
          updateFieldSet += `"${field}" = ${data[field]}`;
        }
        preparedUpdateSet += updateFieldSet;
      }
    }
    return preparedUpdateSet;
  }

  /**
   * @param {*} id - the id of the resource
   * @returns {Boolean} - boolean flag showing success or failure with the delete operation
   * @memberof Model
   */
  async delete(id) {
    const queryText = `DELETE FROM ${this.table} WHERE id = ${id}`;

    try {
      const result = await this.connection.query(queryText);
      if (result.rowCount === 1) {
        return true;
      }
      return false;
    } catch (err) {
      debug('query_error ', err.stack);
      return err.stack;
    }
  }

  /**
   * @returns {Object} - the id of the last item on the table
   * @memberof Model
   */
  async getLastId() {
    // const lastItem = this.records[this.records.length - 1];
    // return lastItem.id;

    // const lastItem = this.getAll();
  }
}
