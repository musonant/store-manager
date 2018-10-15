import { Router } from 'express';

const v1Router = Router();

// Matches /api the API home route
v1Router.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "Store Manger API V1"
  });
});

export default v1Router;