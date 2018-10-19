import Model from './Model';
import users from '../database/users';

/**
 * Handles data requests for the User resource
 *
 * @class User
 * @extends {Model}
 */
export default class User extends Model {
  /**
   * Creates an instance of User.
   * @memberof User
   */
  constructor() {
    const fields = ['id', 'userType', 'email'];
    super(users, fields);
  }
}
