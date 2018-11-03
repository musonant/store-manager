import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/User';

dotenv.config();

const User = new UserModel();

/**
 *This controller handles
 *requests for the products resource
 * @class ProductController
 */
class AuthController {
  /**
   * This function handle requests
   * to the /login POST route
   * @static
   * @param {Object} req - The request object received
   * @param {Object} res - The response object to be returned
   * @returns {Object} - prepared response object
   * @memberof ProductController
   */
  static async login(req, res) {
    const { email, password } = req.body;

    const queryText = `
      SELECT * FROM users 
      WHERE "email" = '${email}'
    `;
    try {
      const resultSet = await User.connection.query(queryText);
      const user = resultSet.rows[0];
      let passwordMatched = false;
      if (user) {
        passwordMatched = bcrypt.compareSync(password, user.password);
      }
      if (!passwordMatched) {
        return res.status(401).send({
          message: 'Failed',
          data: 'Not Found',
        });
      }
      const payload = {
        email: user.email,
        userId: user.id,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24, // token expires after 24 hours
      });
      req.token = token;
      return res.status(200).send({
        message: 'success',
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        token,
      });
    } catch (err) {
      return res.status(500).send({
        message: 'Failure',
        data: err.stack,
      });
    }
  }

  static async createAttendant(req, res) {
    const userData = req.body;
    const password = bcrypt(userData.password);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    userData.password = hashedPassword;

    const user = await User.create(userData);
    return res.status(200).send({
      message: 'success',
      data: user,
    });
  }
}

export default AuthController;
