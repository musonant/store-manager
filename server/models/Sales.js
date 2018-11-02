import Model from './Model';
import saleSchema from '../migrations/sales';

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
   * @param {String} table - Resource table name
   * @param {Array} fields - List of table fields
   * @param {Array} fieldTypes - List of table field types
   */
  constructor(
    table = saleSchema.table,
    fields = saleSchema.fields,
    fieldTypes = saleSchema.fieldTypes,
  ) {
    super(table, fields, fieldTypes);
    this.productPivot = 'sale_product';
  }

  /**
   * This function gets all the products
   * attached to the sale with the specified id
   *
   * @param {Number} salesId - the id of the sales
   * @returns {Array} - the array of products contained in the sale
   */
  async getProducts(salesId) {
    let queryText = `SELECT * FROM sale_product WHERE "salesId" = ${salesId}`;
    try {
      let resultSet = await this.connection.query(queryText);
      const sales = resultSet.rows;
      let productIds = ''; // structure as '1,2,3' for IN quering
      sales.forEach((item, index) => {
        if (index > 0) {
          productIds += ',';
        }
        productIds += item.productId;
      });
      if (productIds !== '') {
        queryText = `SELECT * FROM products WHERE id IN (${productIds})`;
        // console.log(queryText);
        resultSet = await this.connection.query(queryText);
        const products = resultSet.rows;
        return products;
      }
      return null;
    } catch (err) {
      return err.stack;
    }
  }

  async getAllSales() {
    const records = await this.getAll();
    const sales = records.map(async (item) => {
      const sale = item;
      sale.products = await this.getProducts(sale.id);
      return sale;
    });

    const salesRecords = await Promise.all(sales);

    return salesRecords;
  }
}
