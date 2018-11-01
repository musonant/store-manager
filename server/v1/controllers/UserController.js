import jwt from 'jsonwebtoken';
import UserModel from '../../models/User';

const User = new UserModel();

class UserController {
  static async list(req, res) {
    const users = await User.getAll();
    return res.status(200).send({
      message: 'success',
      data: users,
    });
  }

  static async store(req, res) {
    jwt.sign();

    const lastId = this.getLastId();
    const data = req.body;
  }

  static async sign(req, res) {
    const users = await User.getAll();
    const lastUser = users[0];
    jwt.sign({ lastUser }, 'owner@store.demo', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token,
      });
    });
  }

  static async getLastId() {
    const users = await User.getAll();
    const lastUser = users[(users.length - 1)];
    const { id } = lastUser;
    return id;
  }
}

export default UserController;
