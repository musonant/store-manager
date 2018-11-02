import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import loginValidation from '../middlewares/authInputValidation';


const authRouter = Router();

authRouter.post('/login', loginValidation.login, AuthController.login);

export default authRouter;
