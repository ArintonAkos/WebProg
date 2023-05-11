import { Schema, model } from 'mongoose';

export interface IReservation {
  userId: string;
  restaurantId: string;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
}

const reservationSchema = new Schema<IReservation>({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  time: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
});

const Reservation = model<IReservation>('Reservation', reservationSchema);

export default Reservation;
