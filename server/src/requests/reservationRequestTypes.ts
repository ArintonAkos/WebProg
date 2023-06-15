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

interface GetReservedTablesProps {
  date: string;
  time: string;
  [key: string]: string;
}

export interface GetReservedTablesRequest extends Request {
  query: GetReservedTablesProps;
  params: {
    restaurantId: string;
  };
}
