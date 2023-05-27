import { Schema, model, Types } from 'mongoose';

export interface IReservation {
  userId: string;
  restaurantId: Types.ObjectId;
  time: Date;
  numberOfGuests: number;
  contactInfo: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const reservationSchema = new Schema<IReservation>({
  userId: { type: String, required: true },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  time: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'], required: true },
});

const Reservation = model<IReservation>('Reservation', reservationSchema);

export default Reservation;
