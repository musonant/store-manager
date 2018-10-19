import ProductModel from '../../models/Product';

const Product = new ProductModel();

/**
 *This controller handles
 *requests for the products resource
 * @class ProductController
 */
class ProductController {
  /**
   * This function handle requests
   * to the /products home POST route
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof ProductController
   */
  static list(req, res) {
    return res.status(200).send({
      message: 'success',
      data: Product.getAll()
    });
  }
}

export default ProductController;
