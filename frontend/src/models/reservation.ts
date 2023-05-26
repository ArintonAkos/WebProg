interface Reservation {
  _id: string;
  name: string;
  restaurantId: string;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default Reservation;
