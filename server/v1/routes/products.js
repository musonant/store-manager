import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import AuthToken from '../middlewares/authToken';
import RoleAuth from '../middlewares/roleAuth';

const productRouter = Router();

productRouter.get('/', ProductController.list);
productRouter.post('/', AuthToken.authenticate, RoleAuth.isOwner, ProductController.store);
productRouter.get('/:productId', AuthToken.authenticate, ProductController.retrieve);
productRouter.put('/:productId', AuthToken.authenticate, ProductController.update);
productRouter.delete('/:productId', AuthToken.authenticate, ProductController.delete);

export default productRouter;
