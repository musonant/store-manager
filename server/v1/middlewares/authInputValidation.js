/**
 *
 * @class AuthInputValidation
 */
class AuthInputValidation {
  /**
   *
   *
   * @static
   * @param {Object} req - the request received
   * @param {Object} res = the response to be returned
   * @param {Object} next - the next function to be called after input validation
   * @return {Object} - error message on validation failure
   * @memberof AuthInputValidation
   */
  static async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send({
        status: 'Failed',
        message: 'missing credentials',
      });
    } else {
      next();
    }
  }
}

export default AuthInputValidation;
