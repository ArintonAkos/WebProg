import { Schema, model, Document } from 'mongoose';

export interface Reservation {
  userId: string;
  restaurantId: string;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
}

const reservationSchema = new Schema<Reservation>({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  time: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
});

const ReservationModel = model<Reservation>('Reservation', reservationSchema);

export default ReservationModel;
