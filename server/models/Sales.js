import Model from './Model';
import saleSchema from '../migrations/sales';
import productSchema from '../migrations/products';
import saleProduct from '../database/sale_product';

/**
 * Handles data requests for the Sales resource
 *
 * @class Sales
 * @extends {Model}
 */
export default class Sales extends Model {
  /**
   * Creates an instance of Sales.
   * @memberof Sales
   * @param {Array} records - List of existing records
   * @param {Array} fields - List of table fields
   */
  constructor(records = null, fields = null) {
    records = records || saleSchema.records;
    fields = fields || saleSchema.fields;
    super(records, fields);
    this.productPivot = saleProduct;
  }

  /**
   * This function gets all the products
   * attached to the sale with the specified id
   *
   * @param {Number} salesId - the id of the sales
   * @returns {Array} - the array of products contained in the sale
   */
  getProducts(salesId) {
    const sales = this.productPivot.filter(item => item.salesId === salesId);
    const productIdArray = [];
    sales.forEach((item) => {
      productIdArray.push(item.productId);
    });

    const productsArray = [];
    const products = productSchema.records;

    productIdArray.forEach((id) => {
      productsArray.push(products.find(item => item.id === id));
    });

    return productsArray;
  }
}
