interface Restaurant {
  name: string;
  phone: string;
  openingHours: string;
  city: string;
  street: string;
  number: number;
  images?: string[];
  _id?: string;
}

export interface MinimalRestaurantData {
  _id: string;
  name: string;
  openingHours: string;
  city: string;
  images?: string[];
}

export default Restaurant;
