import React from 'react';
import { Container } from '@chakra-ui/react';

const data = localStorage.getItem('form');

const FormDataPage: React.FC = () => {
  return (
    <Container mt={5}>
      <pre>{data}</pre>
    </Container>
  );
};

export default FormDataPage;
