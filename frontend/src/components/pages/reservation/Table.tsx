import React, { MouseEventHandler } from 'react';
import { Box, Button, Flex, Stack, Text, Tooltip, useBreakpointValue } from '@chakra-ui/react';

interface TableProps {
  id: string;
  number: number;
  seats: number;
  reserved: boolean;
  selected: boolean;
  onClick: (tableId: string) => void;
}

const Table: React.FC<TableProps> = ({ id, number, seats, reserved, selected, onClick }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    onClick(id);
  };

  const size = useBreakpointValue({ base: '90px', md: '100px', lg: '120px' });

  const status = reserved ? 'Reserved' : selected ? 'Selected' : 'Available';

  return (
    <Box p="5">
      <Tooltip
        label={
          <Stack>
            <Text>Number: {number}</Text>
            <Text>Seats: {seats}</Text>
            <Text>Status: {status}</Text>
          </Stack>
        }
        fontSize="md"
      >
        <Button
          width={size}
          height={size}
          bg={reserved ? 'red.500' : selected ? 'gray.500' : 'green.500'}
          color="white"
          onClick={handleClick}
          isDisabled={reserved}
          position="relative"
        >
          <Flex justifyContent="center" alignItems="center" position="absolute" width="100%" height="100%">
            {number}
          </Flex>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Table;
