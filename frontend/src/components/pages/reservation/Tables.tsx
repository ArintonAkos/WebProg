import React, { useState } from 'react';
import Table from './Table';
import { SimpleGrid } from '@chakra-ui/react';
import { BaseTable } from '../../../models/table';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface TablesProps {
  onTableClick: (tableId: string) => void;
  tables: BaseTable[];
  selectedTableIds: string[];
}

const Tables: React.FC<TablesProps> = ({ onTableClick, tables, selectedTableIds }) => {
  const reservedTableIds = useSelector((state: RootState) => state.reservation.reservedTables).map((t) => t._id);

  return (
    <SimpleGrid columns={4} spacing={10}>
      {tables.map((table) => (
        <Table
          key={table._id}
          id={table._id}
          number={table.number}
          seats={table.seats}
          reserved={reservedTableIds.includes(table._id)}
          selected={selectedTableIds.includes(table._id)}
          onClick={() => onTableClick(table._id)}
        />
      ))}
    </SimpleGrid>
  );
};

export default Tables;
