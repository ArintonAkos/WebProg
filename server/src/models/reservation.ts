import { Schema, model } from 'mongoose';

export interface Reservation {
  name: string;
  restaurantId: string;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
}

const reservationSchema = new Schema<Reservation>({
  name: { type: String, required: true },
  restaurantId: { type: String, required: true },
  time: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  contactInfo: { type: String, required: true },
});

const Reservation = model<Reservation>('Reservation', reservationSchema);

export default Reservation;
