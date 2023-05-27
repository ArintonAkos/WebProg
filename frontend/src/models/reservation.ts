interface BaseReservation {
  _id: string;
  name: string;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Reservation extends BaseReservation {
  restaurantId: string;
}

export interface PopulatedReservation extends BaseReservation {
  restaurantId: Reservation;
}

export default Reservation;
