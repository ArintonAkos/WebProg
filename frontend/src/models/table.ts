import Restaurant from './restaurant';

export interface BaseTable {
  _id: string;
  number: number;
  seats: number;
}

interface Table extends BaseTable {
  restaurant: Restaurant;
}

export default Table;
