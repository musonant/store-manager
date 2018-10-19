import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './v1/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Store Manager API',
  });
});

app.use('/api/v1', apiRoutes);

// for un-available routes
app.use('*', (req, res) => {
  res.status(404);
  res.json({
    status: 'Failed',
    message: 'Page not found'
  });
});

export default app;
