import { model, Schema, Types } from 'mongoose';

export interface IRestaurant {
  _id?: Types.ObjectId;
  name: string;
  phone: string;
  openingHours: string;
  city: string;
  street: string;
  number: string;
  tables: Types.ObjectId[];
  images?: string[];
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  phone: { type: String, required: true },
  openingHours: { type: String, required: true },
  tables: [{ type: Schema.Types.ObjectId, ref: 'Table', required: true }],
  images: [
    {
      type: String,
    },
  ],
});

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
