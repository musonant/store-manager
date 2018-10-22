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
  constructor(records = null, fields = null) {
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
      if (field === 'createdAt') {
        // this value should be replaced with the current time
        newResource[field] = new Date();
      }
      if (field === 'updatedAt') {
        // this value should be replaced with the current time
        newResource[field] = new Date();
      }
    });

    this.records.push(newResource);

    return newResource;
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
