import express from 'express';
import reservationRoutes from './routes/reservationRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import connectToDatabase from './config/database';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('../images', express.static('images'));

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
    console.log(app.path());
  });
});
