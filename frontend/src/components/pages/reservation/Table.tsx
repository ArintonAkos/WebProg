import React, { MouseEventHandler } from 'react';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';

interface TableProps {
  id: string;
  reserved: boolean;
  onClick: (tableId: string) => void;
}

const Table: React.FC<TableProps> = ({ id, reserved, onClick }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onClick(id);
  };

  const size = useBreakpointValue({ base: '90px', md: '100px', lg: '120px' });

  return (
    <Box p="5">
      <Button
        width={size}
        height={size}
        bg={reserved ? 'red.500' : 'green.500'}
        color="white"
        onClick={handleClick}
        isDisabled={reserved}
        position="relative"
      >
        <Flex justifyContent="center" alignItems="center" position="absolute" width="100%" height="100%">
          {id}
        </Flex>
      </Button>
    </Box>
  );
};

export default Table;
