import Model from './Model';
import saleProductSchema from '../migrations/sale_product';

/**
 * Handles data requests for the Product resource
 *
 * @class Product
 * @extends {Model}
 */
export default class Product extends Model {
  /**
   * Creates an instance of Product.
   * @param {String} table - Resource table name
   * @param {Array} fields - List of table fields
   * @param {Array} fieldTypes - List of table field types
   * @memberof Product
   */
  constructor(
    table = saleProductSchema.table,
    fields = saleProductSchema.fields,
    fieldsTypes = saleProductSchema.fieldTypes,
  ) {
    super(table, fields, fieldsTypes);
  }

  /**
   *
   * @param {Array} data - array of records to create
   */
  async createOrders(data) {
    let queryText = ''; let preparedData;
    data.forEach((item) => {
      preparedData = this.prepareData(item);
      const { fieldList, fieldValues } = preparedData;
      queryText += `INSERT INTO ${this.table} (${fieldList}) VALUES (${fieldValues});`;
    });
    try {
      const resultSet = await this.connection.query(queryText);
      const newResource = resultSet.rows[0];
      return newResource;
    } catch (err) {
      return err.stack;
    }
  }
}
