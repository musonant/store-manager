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
  static async list(req, res) {
    const allProducts = await Product.getAll();
    return res.status(200).send({
      message: 'success',
      data: allProducts,
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
  static async store(req, res) {
    const product = await Product.create(req.body);

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
  static async retrieve(req, res) {
    const id = Number(req.params.productId);
    const product = await Product.findById(id);
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

  /**
   *
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof ProductController
   */
  static async update(req, res) {
    const id = Number(req.params.productId);
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({
        message: 'Not Found',
      });
    }

    product = await Product.update(id, req.body);

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
  static async delete(req, res) {
    const id = Number(req.params.productId);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({
        message: 'Not Found',
      });
    }

    const deleted = await Product.delete(id);

    if (!deleted) {
      return res.status(400).send({
        message: 'Failure',
      });
    }
    return res.status(204).send({
      message: 'success',
    });
  }
}

export default ProductController;
