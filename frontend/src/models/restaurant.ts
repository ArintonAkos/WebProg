import Table from './table';

interface Restaurant {
  _id: string;
  name: string;
  phone: string;
  openingHours: string;
  city: string;
  street: string;
  number: number;
  tables: Table[];
  images?: string[];
}

export interface MinimalRestaurantData {
  _id: string;
  name: string;
  openingHours: string;
  city: string;
  images?: string[];
}

export default Restaurant;
