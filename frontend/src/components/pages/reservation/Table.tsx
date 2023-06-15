import React, { MouseEventHandler } from 'react';
import { Box, Button } from '@chakra-ui/react';

interface TableProps {
  id: string;
  reserved: boolean;
  onClick: (tableId: string) => void;
}

const Table: React.FC<TableProps> = ({ id, reserved, onClick }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onClick(id);
  };

  return (
    <Box p="5" bg={reserved ? 'red.500' : 'green.500'}>
      <Button onClick={handleClick} isDisabled={reserved}>
        {reserved ? 'Reserved' : 'Free'}
      </Button>
    </Box>
  );
};

export default Table;
