import { Types } from 'mongoose';
import { TableProps } from '../requests/restaurantRequestTypes';
import Table from '../models/table';

export const createTables = async (restaurantId: Types.ObjectId, tables: TableProps[]): Promise<Types.ObjectId[]> =>
  await Promise.all(
    tables.map(async (tableData) => {
      const table = new Table({
        ...tableData,
        restaurant: restaurantId,
      });

      await table.save();

      return table._id;
    }),
  );

export const deleteTable = async (tableId: Types.ObjectId) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(tableId);

    if (!deletedTable) {
      return null;
    }

    return deletedTable;
  } catch (error) {
    console.error('Error deleting table:', error);
    return null;
  }
};
