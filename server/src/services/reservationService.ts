import { Document } from 'mongoose';
import { Reservation } from '../models/reservation';
import Restaurant from '../models/restaurant';
import { getOpeningHours } from './restaurantService';

export const validateStartTime = (startTime: Date) => {
  const currentDate = new Date();

  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  return currentDate.getTime() <= startTime.getTime();
};

export const validateReservationTime = async (
  reservationStartTime: Date,
  reservationEndTime: Date,
  existingReservation: Document<{}, any, Reservation> | null,
): Promise<boolean> => {
  console.log('A');
  if (!existingReservation) {
    return true;
  }

  const restaurantId = existingReservation.get('restaurantId');
  const restaurant = await Restaurant.findById(restaurantId);

  console.log('B');
  if (!restaurant) {
    return false;
  }

  const openingHours = restaurant.get('openingHours');
  const [start, end] = getOpeningHours(openingHours);

  console.log('C');
  return !(reservationStartTime < start || reservationEndTime > end);
};
