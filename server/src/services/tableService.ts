import { TableProps } from '../requests/restaurantRequestTypes';
import Table from '../models/table';
import { Types } from 'mongoose';

export const createTables = async (restaurantId: Types.ObjectId, tables: TableProps[]): Promise<Types.ObjectId[]> => {
  return await Promise.all(
    tables.map(async (tableData) => {
      const table = new Table({
        ...tableData,
        restaurant: restaurantId,
      });

      await table.save();

      return table._id;
    }),
  );
};
