import express from 'express';
import reservationRoutes from './routes/reservationRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import connectToDatabase from './config/database';
import path from 'path';
import { upload } from './utils/storage';

const app = express();
const port = 3000;

export const uploadImages = upload.array('images');
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

connectToDatabase().then(() => {
  app.use('/reservation', reservationRoutes);
  app.use('/restaurant', restaurantRoutes);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
