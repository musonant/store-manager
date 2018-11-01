import Model from './Model';
import userTokenSchema from '../migrations/user_tokens';

/**
 * Handles data requests for the User resource
 *
 * @class User
 * @extends {Model}
 */
export default class User extends Model {
  /**
   * Creates an instance of User.
   * @memberof UserToken
   * @param {String} table - Resource table name
   * @param {Array} fields - List of table fields
   * @param {Array} fieldTypes - List of table field types
   */
  constructor(
    table = userTokenSchema.table,
    fields = userTokenSchema.fields,
    fieldTypes = userTokenSchema.fieldTypes,
  ) {
    super(table, fields, fieldTypes);
  }
}
