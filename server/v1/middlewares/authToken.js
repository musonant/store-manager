import tokens from '../../database/tokens';

/**
 * Authenticate a user
 *
 * @class AuthToken
 */
class AuthToken {
  /**
   *
   *
   * @static
   * @param {Object} req - the request received
   * @param {Object} res = the response to be returned
   * @param {Object} next - the next function to be called after authentication
   * @return {Object} - error message on authentication failure
   * @memberof AuthToken
   */
  static authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const tokenFound = tokens.find(item => item.token === token);

    if (token) {
      if (!tokenFound) {
        res.status(401).send({
          status: 'failed',
          message: 'wrong token'
        });
      } else {
        req.decoded = tokenFound;
        next();
      }
    } else {
      res.status(401).send({
        status: 'failed',
        message: 'missing token'
      });
    }
  }
}

export default AuthToken;
