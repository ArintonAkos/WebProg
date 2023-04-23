import { Schema, model } from 'mongoose';

interface Reservation {
  name: string;
  restaurantId: string;
  time: Date;
}

const reservationSchema = new Schema<Reservation>({
  name: { type: String, required: true },
  restaurantId: { type: String, required: true },
  time: { type: Date, required: true },
});

const Reservation = model<Reservation>('Reservation', reservationSchema);

export default Reservation;
