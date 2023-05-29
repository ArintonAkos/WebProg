import Restaurant from './restaurant';
import User from './user';

interface BaseReservation {
  _id: string;
  name: string;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Reservation extends BaseReservation {
  userId: User;
  restaurantId: Restaurant;
}

export default Reservation;
