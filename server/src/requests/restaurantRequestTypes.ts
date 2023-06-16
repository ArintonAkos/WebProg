import Request from '../types/request.types';
import { Multer } from 'multer';

export interface TableProps {
  number: number;
  seats: number;
}

interface RestaurantProps {
  name: string;
  city: string;
  street: string;
  number: number;
  phone: string;
  openingHours: string;
  tables: TableProps[];
}

export interface AddRestaurantRequest extends Request {
  body: RestaurantProps;
}

export interface EditRestaurantRequest extends Request {
  body: RestaurantProps;
  params: {
    id: string;
  };
  files: Multer.File[];
}
