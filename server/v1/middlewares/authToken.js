// import tokens from '../../database/tokens';
import UserTokenModel from '../../models/UserToken';

const UserToken = new UserTokenModel();

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
    const tokenFound = await UserToken.findByFieldName({ fieldName: 'token', value: token });

    if (token) {
      if (!tokenFound) {
        res.status(401).send({
          status: 'Failed',
          message: 'wrong token',
        });
      } else {
        req.decoded = tokenFound;
        next();
      }
    } else {
      res.status(401).send({
        status: 'Failed',
        message: 'missing token',
      });
    }
  }
}

export default AuthToken;
