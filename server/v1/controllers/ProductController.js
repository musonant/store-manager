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
      data: Product.getAll(),
    });
  }

  /**
   *
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof ProductController
   */
  static store(req, res) {
    const product = Product.create(req.body);

    return res.status(200).send({
      message: 'success',
      data: product,
    });
  }

  /**
   *
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof ProductController
   */
  static retrieve(req, res) {
    const id = Number(req.params.productId);
    const product = Product.findById(id);
    if (!product) {
      return res.status(404).send({
        message: 'Not Found',
      });
    }
    return res.status(200).send({
      message: 'success',
      data: product,
    });
  }
}

export default ProductController;
