import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../../components/form';
import { createRestaurant } from '../../actions/restaurantActions';
import useAppDispatch from '../../hooks/useAppDispatch';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import { useForm } from 'react-hook-form';

export type AddRestaurantFormData = {
  name: string;
  city: string;
  street: string;
  number: string;
  phone: string;
  openingHours: string;
  images?: Array<File>;
};

const fields: Array<FormFieldProps> = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeHolder: 'Arinton Akos',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    required: true,
    placeHolder: 'Kolozsvar',
  },
  {
    name: 'street',
    label: 'Street',
    type: 'text',
    required: true,
    placeHolder: 'Farkas utca',
  },
  {
    name: 'number',
    label: 'Number',
    type: 'text',
    required: true,
    placeHolder: '5',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: true,
    placeHolder: '(+40) 712 345 678',
  },
  {
    name: 'openingHours',
    label: 'Opening Hours',
    type: 'text',
    required: true,
    placeHolder: '8:00 - 16:00',
  },
];

const AddRestaurantForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useStateHandling('restaurant');
  const methods = useForm();

  const handleFormSubmit = (data: AddRestaurantFormData) => {
    dispatch(createRestaurant(data));
  };

  return (
    <StatusHandler status={status} error={error}>
      <Container mt={5}>
        <Text fontSize="2xl" mb={5}>
          Add Restaurant
        </Text>
        <Form fields={fields} onSubmit={handleFormSubmit} submitText="Add Restaurant" methods={methods} />
      </Container>
    </StatusHandler>
  );
};

export default AddRestaurantForm;
