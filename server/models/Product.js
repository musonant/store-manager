import Model from './Model';
import products from '../database/products';

/**
 * Handles data requests for the Product resource
 *
 * @class Product
 * @extends {Model}
 */
export default class Product extends Model {
  /**
   * Creates an instance of Product.
   * @memberof Product
   */
  constructor() {
    const fields = ['id', 'name', 'quantityStocked', 'categoryId', 'price'];
    super(products, fields);
  }
}
