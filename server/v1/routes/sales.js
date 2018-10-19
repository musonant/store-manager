import { Router } from 'express';
import SalesController from '../controllers/SalesController';
import authToken from '../middlewares/authToken';
import roleAuth from '../middlewares/roleAuth';

const salesRouter = Router();

salesRouter.post('/', authToken.authenticate, roleAuth.isAttendant, SalesController.store);
salesRouter.get('/', authToken.authenticate, roleAuth.isOwner, SalesController.list);


export default salesRouter;
