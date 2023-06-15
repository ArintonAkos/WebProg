import Request from '../types/request.types';

interface AddReservationProps {
  email: string;
  phone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  tableIds: Array<string>;
}

export interface AddReservationRequest extends Request {
  body: AddReservationProps;
  params: {
    restaurantId: string;
  };
}
