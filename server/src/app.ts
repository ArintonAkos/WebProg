import express from 'express';
import reservationRoutes from './routes/reservationRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import cors from './middlewares/cors';
import path from 'path';
import responseFormatter from './middlewares/responseFormatter';

const app = express();

app.use(responseFormatter);
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use('/reservation', reservationRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(errorHandler);

export default app;
