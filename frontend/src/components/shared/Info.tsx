import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

const Info: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <Alert status="info" borderRadius="md">
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
    </Alert>
  );
};

export default Info;
