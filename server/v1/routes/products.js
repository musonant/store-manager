import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();

productRouter.get('/', ProductController.list);

export default productRouter;
