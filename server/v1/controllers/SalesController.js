import SalesModel from '../../models/Sales';
import SaleProductModel from '../../models/SaleProduct';

const Sales = new SalesModel();
const SaleProduct = new SaleProductModel();

/**
 *This controller handles
 *requests for the sales resource
 * @class SalesController
 */
class SalesController {
  /**
   * This function handle requests
   * to the /sales home POST route
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof SalesController
   */
  static async store(req, res) {
    const { user } = req;
    const data = req.body;
    data.attendantId = user.id;
    const sale = await Sales.create(data);
    // const missingOrders = data.orders === undefined;

    const saleProductData = [];
    if (data.orders !== undefined) {
      data.orders.forEach((item) => {
        const order = item;
        order.salesId = sale.id;
        saleProductData.push(order);
      });
      await SaleProduct.createOrders(saleProductData);
    } else {
      return res.status(400).send({
        message: 'Your request is missing orders',
      });
    }

    sale.products = await Sales.getProducts(sale.id);

    return res.status(200).send({
      status: 'Success',
      data: sale,
    });
  }

  /**
   * This function handle requests
   * to the /sales home POST route
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof SalesController
   */
  static async list(req, res) {
    const sales = await Sales.getAllSales();
    return res.status(200).send({
      message: 'success',
      data: sales,
    });
  }

  /**
   *
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof SalesController
   */
  static async retrieve(req, res) {
    const { sale } = req;

    sale.products = await Sales.getProducts(sale.id);

    return res.status(200).send({
      message: 'success',
      data: sale,
    });
  }
}

export default SalesController;
