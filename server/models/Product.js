import Model from './Model';
import productSchema from '../migrations/products';

/**
 * Handles data requests for the Product resource
 *
 * @class Product
 * @extends {Model}
 */
export default class Product extends Model {
  /**
   * Creates an instance of Product.
   * @param {Array} records - List of existing records
   * @param {Array} fields - List of table fields
   * @memberof Product
   */
  constructor(records = null, fields = null) {
    records = records || productSchema.records;
    fields = fields || productSchema.fields;
    this.records = records;
    this.fields = fields;
    super(records, fields);
  }
}
