import { model, Schema, Types } from 'mongoose';

export interface ITable {
  _id?: Types.ObjectId;
  number: number;
  seats: number;
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

tableSchema.index({ restaurant: 1, number: 1 }, { unique: true });

const Table = model<ITable>('Table', tableSchema);

export default Table;
