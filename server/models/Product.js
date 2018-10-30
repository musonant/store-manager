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
   * @param {String} table - Resource table name
   * @param {Array} fields - List of table fields
   * @memberof Product
   */
  constructor(table = productSchema.table, fields = productSchema.fields) {
    super(table, fields);
  }
}
