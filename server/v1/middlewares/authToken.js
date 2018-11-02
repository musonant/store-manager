import jwt from 'jsonwebtoken';

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
  static async authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401);
          res.json({
            status: 'Failed',
            message: 'Authentication failed. Token is either invalid or expired',
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403);
      res.json({
        status: 'Failed',
        message: 'missing token',
      });
    }
  }
}

export default AuthToken;
