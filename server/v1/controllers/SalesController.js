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
    const sales = Sales.create(data);

    if (data.orders !== undefined) {
      data.orders.forEach((item) => {
        item.salesId = sales.id;
        Sales.productPivot.push(item);
      });
    }

    sales.products = Sales.getProducts(sales.id);

    res.status(200).send({
      status: 'Success',
      data: sales
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
}

export default SalesController;
