import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box textAlign="center" my={4}>
      <Spinner />
    </Box>
  );
};

export default Loading;
