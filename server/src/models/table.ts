import { model, Schema, Types } from 'mongoose';

export interface ITable {
  _id?: Types.ObjectId;
  number: Number;
  seats: Number;
  restaurant: Types.ObjectId;
}

const tableSchema = new Schema<ITable>({
  number: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
});

const Table = model<ITable>('Table', tableSchema);

export default Table;
