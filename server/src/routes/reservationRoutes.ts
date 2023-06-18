import express from 'express';
import {
  addReservation,
  deleteReservation,
  getAllReservations,
  getManagedReservations,
  getReservationsByRestaurantId,
  getReservedTablesByRestaurantId,
  updateReservation,
} from '../controllers/reservationController';
import { Types } from 'mongoose';
import { validateAddReservation } from '../validators/reservation';

const router = express.Router();

const validateRestaurantId = (req, res, next) => {
  const { restaurantId } = req.params;
  if (Types.ObjectId.isValid(restaurantId)) {
    next();
  } else {
    next('route');
  }
};

router.post('/:restaurantId', validateAddReservation, addReservation);
router.get('/:restaurantId', validateRestaurantId, getReservationsByRestaurantId);
router.get('/reserved-tables/:restaurantId', validateRestaurantId, getReservedTablesByRestaurantId);
router.delete('/:id', deleteReservation);
router.put('/:id', updateReservation);
router.get('/', getAllReservations);
router.get('/managed', getManagedReservations);

export default router;
