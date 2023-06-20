import express from 'express';
import reservationRoutes from './routes/reservationRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import cors from './middlewares/cors';
import responseFormatter from './middlewares/responseFormatter';
import authentication from './middlewares/authentication';
import ability from './middlewares/ability';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('/images'));
app.use(cors);
app.use(responseFormatter);
app.use(authentication);
app.use(ability);
app.use('/reservation', reservationRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(errorHandler);

export default app;
