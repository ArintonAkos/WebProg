import Restaurant from '../models/restaurant';
import { getOpeningHours } from './restaurantService';

export const validateStartTime = (startTime: Date) => {
  console.log(startTime);
  const selectedDate = new Date(startTime.toISOString().slice(0, 10));

  selectedDate.setSeconds(0);
  selectedDate.setMilliseconds(0);

  return selectedDate.getTime() <= startTime.getTime();
};

export const validateReservationTime = async (
  reservationStartTime: Date,
  reservationEndTime: Date,
  restaurantId: string,
): Promise<boolean> => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    return false;
  }

  const openingHours = restaurant.get('openingHours');
  const [start, end] = getOpeningHours(openingHours, reservationStartTime);

  return !(reservationStartTime < start || reservationEndTime > end);
};
