import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../components/form';

const fields: Array<FormFieldProps> = [
  {
    name: 'name',
    required: true,
    type: 'text',
    label: 'Name',
    placeHolder: 'Arinton Akos',
  },
  {
    name: 'no_of_guests',
    required: true,
    type: 'number',
    label: 'Number of Guests',
    placeHolder: '2',
  },
  {
    name: 'reservation_date',
    required: true,
    type: 'datetime-local',
    label: 'Reservation Date & Time',
  },
];

const ReservationForm: React.FC = () => {
  const handleFormSubmit = (data: any) => {};

  return (
    <Container mt={5}>
      <Text fontSize="2xl" mb={5}>
        Make a Reservation
      </Text>
      <Form fields={fields} onSubmit={handleFormSubmit} submitText="Make Reservation"></Form>
    </Container>
  );
};

export default ReservationForm;
