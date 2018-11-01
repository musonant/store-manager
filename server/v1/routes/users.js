import { Router } from 'express';
import UserController from '../controllers/UserController';
import authToken from '../middlewares/authToken';
import roleAuth from '../middlewares/roleAuth';

const usersRouter = Router();

usersRouter.get('/users', /* authToken.authenticate, roleAuth.isOwner, */ UserController.sign);
// usersRouter.post('/signup', authToken.authenticate, roleAuth.isOwner, UserController.store);

export default usersRouter;
