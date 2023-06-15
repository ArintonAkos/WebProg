import React, { useState } from 'react';
import Table from './Table';
import { SimpleGrid } from '@chakra-ui/react';

interface TablesProps {
  onTableClick: (tableId: string) => void;
}

const Tables: React.FC<TablesProps> = ({ onTableClick }) => {
  const [tables, setTables] = useState([
    { id: '1', reserved: true },
    { id: '2', reserved: true },
    { id: '3', reserved: true },
    { id: '4', reserved: false },
  ]);

  return (
    <SimpleGrid columns={4} spacing={10}>
      {tables.map((table) => (
        <Table key={table.id} id={table.id} reserved={table.reserved} onClick={() => onTableClick(table.id)} />
      ))}
    </SimpleGrid>
  );
};

export default Tables;
