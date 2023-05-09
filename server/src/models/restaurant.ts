import { Schema, model, Document } from 'mongoose';

export interface Restaurant {
  name: string;
  phone: string;
  openingHours: string;
  city: string;
  street: string;
  number: string;
  images?: string[];
}

const restaurantSchema = new Schema<Restaurant>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  phone: { type: String, required: true },
  openingHours: { type: String, required: true },
  images: [
    {
      type: String,
    },
  ],
});

const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);

export default RestaurantModel;
