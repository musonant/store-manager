import UserModel from '../../models/User';
import SalesModel from '../../models/Sales';

const User = new UserModel();
const Sales = new SalesModel();

/**
 * Authenticate a user
 *
 * @class RoleAuth
 */
class RoleAuth {
  /**
   *
   *
   * @static
   * @param {Object} req - the request received
   * @param {Object} res = the response to be returned
   * @param {Object} next - the next function to be called after authentication
   * @return {Object} - error message on authentication failure
   * @memberof RoleAuth
   */
  static isOwner(req, res, next) {
    const { userId } = req.decoded;
    console.log(userId);
    const user = User.findById(userId);

    if (user.userType !== 'store_owner') {
      res.status(401).send({
        status: 'Failed',
        message: 'you have to be a store owner to make this request'
      });
    } else {
      req.user = user;
      next();
    }
  }

  /**
   * @static
   * @param {Object} req - the request received
   * @param {Object} res = the response to be returned
   * @param {Object} next - the next function to be called after authentication
   * @return {Object} - error message on authentication failure
   * @memberof RoleAuth
   */
  static isAttendant(req, res, next) {
    const { userId } = req.decoded;
    const user = User.findById(userId);

    if (user.userType !== 'store_attendant') {
      res.status(401).send({
        status: 'Failed',
        message: 'you have to be a store attendant to make this request'
      });
    } else {
      req.user = user;
      next();
    }
  }

  /**
   * This makes sure the user is the same as the sale attendant
   * who created the sale
   * @static
   * @param {Object} req - the request received 
   * @param {Object} res - the response to be returned
   * @param {Object} next - the next function to be called after this authentication
   * @returns {Object} - error message indicating authentication failure
   * @memberof RoleAuth
   */
  static allowRetrieve(req, res, next) {
    const { userId } = req.decoded;
    const salesId = Number(req.params.salesId);
    const user = User.findById(userId);
    const sales = Sales.findById(salesId);

    if((user.id === sales.attendantId) || user.userType !== 'store_owner') {
      req.user = user;
      next();
    } else {
      res.status(403).send({
        status: 'Failed',
        message: 'You cannot access this resource'
      });
    }
  }
}

export default RoleAuth;
