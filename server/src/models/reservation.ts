import { model, Schema, Types } from 'mongoose';

export interface IReservation {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  time: Date;
  numberOfGuests: number;
  phone: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected';
  tables: Array<Types.ObjectId>;
}

const reservationSchema = new Schema<IReservation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  time: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'], required: true },
  tables: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
});

const Reservation = model<IReservation>('Reservation', reservationSchema);

export default Reservation;
