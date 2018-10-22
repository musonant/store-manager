import SalesModel from '../../models/Sales';

const Sales = new SalesModel();

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
  static store(req, res) {
    const { user } = req;
    const data = req.body;
    data.attendantId = user.id;
    const sale = Sales.create(data);
    // const missingOrders = data.orders === undefined;

    if (data.orders !== undefined) {
      data.orders.forEach((item) => {
        item.salesId = sale.id;
        Sales.productPivot.push(item);
      });
    } else {
      return res.status(400).send({
        message: 'Your request is missing orders'
      });
    }

    sale.products = Sales.getProducts(sale.id);

    return res.status(200).send({
      status: 'Success',
      data: sale
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
  static list(req, res) {
    return res.status(200).send({
      message: 'success',
      data: Sales.getAll()
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
  static retrieve(req, res) {
    const { sale } = req;

    sale.products = Sales.getProducts(sale.id);

    return res.status(200).send({
      message: 'success',
      data: sale
    });
  }
}

export default SalesController;
