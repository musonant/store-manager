import { Router } from 'express';
import productRouter from './products';

const v1Router = Router();

v1Router.use('/products', productRouter);

// Matches /api the API home route
v1Router.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: 'Store Manger API V1'
  });
});


// v1Router.get('/api/v1/products', productController.list);

export default v1Router;
