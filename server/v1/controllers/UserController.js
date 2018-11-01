import UserModel from '../../models/User';

const User = new UserModel();

class UserController {

  static async list(req, res) {
    const users = await User.getAll();
    console.log(users);
    return res.status(200).send({
      message: 'success',
      data: users,
    });
  }

  static async store(req, res) {
    const data = req.body;
    return data;
  }
}

export default UserController;
