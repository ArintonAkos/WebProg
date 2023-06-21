import { Types } from 'mongoose';
import { TableProps } from '../requests/restaurantRequestTypes';
import Table from '../models/table';

export const createTables = async (restaurantId: Types.ObjectId, tables: TableProps[]): Promise<Types.ObjectId[]> => {
  console.log('CreateTables: ', ...tables);

  return await Promise.all(
    tables.map(async (tableData) => {
      const existingTable = await Table.findOne({
        restaurant: restaurantId,
        number: tableData.number,
      });

      if (existingTable) {
        return existingTable._id;
      }

      const table = new Table({
        number: tableData.number,
        seats: tableData.seats,
        restaurant: restaurantId,
      });

      await table.save();

      return table._id;
    }),
  );
};
export const deleteTable = async (tableId: Types.ObjectId) => {
  try {
    console.log(tableId);
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
