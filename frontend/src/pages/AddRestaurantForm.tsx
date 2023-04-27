import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../components/form';
import { createRestaurant } from '../actions/restaurantActions';
import useAppDispatch from '../hooks/useAppDispatch';
import withLoadingAndErrorFromState from '../hoc/withStateHandling';
import { CustomRootState } from '../reducers/state';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type AddRestaurantFormData = {
  name: string;
  city: string;
  street: string;
  number: string;
  phone: string;
  openingHours: string;
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

  const handleFormSubmit = (data: AddRestaurantFormData) => {
    dispatch(createRestaurant(data));
  };

  return (
    <Container mt={5}>
      <Text fontSize="2xl" mb={5}>
        Add Restaurant
      </Text>
      <Form fields={fields} onSubmit={handleFormSubmit} submitText="Add Restaurant"></Form>
    </Container>
  );
};

export default withLoadingAndErrorFromState(AddRestaurantForm, 'restaurant');
