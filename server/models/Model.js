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
  constructor(records, fields) {
    this.records = records;
    this.fields = fields;
  }

  /**
   * @returns {Array} - An array of all records for the resource
   * @memberof Model
   */
  getAll() {
    return this.records;
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
  create(data) {
    const newResource = {};
    newResource.id = this.getLastId() + 1;

    this.fields.forEach((field) => {
      if (field !== 'id') {
        newResource[field] = data[field];
      }
      if (field === 'created_at') {
        // this value should be replaced with the current time
        newResource[field] = new Date();
      }
      if (field === 'updated_at') {
        // this value should be replaced with the current time
        newResource[field] = new Date();
      }
    });

    return newResource;
  }

  /**
   * @param {*} id - the id of the resource
   * @param {Object} data - the object with field updates for the resource
   * @returns {Object} - the updated resource
   * @memberof Model
   */
  update(id, data) {
    let foundResource = this.records.find(item => item.id === id);
    const updatedResource = foundResource;

    this.fields.forEach((field) => {
      if (field !== 'id') {
        updatedResource[field] = data[field] || foundResource[field];
      }
    });

    foundResource = updatedResource;

    return foundResource;
  }

  /**
   * @param {*} id - the id of the resource
   * @returns {Boolean} - boolean flag showing success or failure with the delete operation
   * @memberof Model
   */
  delete(id) {
    const newRecords = this.records.filter(item => item.id !== id);

    if (newRecords.length === this.records) {
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
