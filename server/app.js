import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import apiRoutes from './v1/routes';

const app = express();
const port = parseInt((process.env.PORT), 10) || 9003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Store Manager API',
  });
});
// app.use('/api/v1', apiRoutes);
app.use('*', (req, res) => {
  res.status(404);
  res.json({
    status: 'Failed',
    message: 'Page not found'
  });
});
app.listen(port, () => { console.log(`Application listening  on port ${port}`); });
export default app;
