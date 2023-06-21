import Request from '../types/request.types';

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

interface EditRestaurantProps extends RestaurantProps {
  deletedImages: string[];
}

export interface BaseRestaurantRequest extends Request {
  params: {
    id: string;
  };
  images: Express.Multer.File[];
}

export interface AddRestaurantRequest extends BaseRestaurantRequest {
  body: RestaurantProps;
}

export interface EditRestaurantRequest extends BaseRestaurantRequest {
  body: EditRestaurantProps;
}
