import Model from './Model';
import userSchema from '../migrations/users';

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
   * @param {Array} records - List of existing records
   * @param {Array} fields - List of table fields
   */
  constructor(records = userSchema.records, fields = userSchema.fields) {
    super(records, fields);
  }
}
