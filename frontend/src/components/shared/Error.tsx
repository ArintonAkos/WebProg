import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Error: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default Error;
