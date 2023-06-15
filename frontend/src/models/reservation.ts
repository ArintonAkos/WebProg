import Restaurant from './restaurant';
import User from './user';
import Table from './table';

interface BaseReservation {
  _id: string;
  name: string;
  time: Date;
  numberOfGuests: number;
  phone: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Reservation extends BaseReservation {
  user: User;
  restaurant: Restaurant;
  tables: Array<Table>;
}

export default Reservation;
