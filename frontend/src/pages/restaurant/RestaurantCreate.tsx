import React, { useMemo } from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form from '../../components/form';
import { createRestaurant } from '../../actions/restaurantActions';
import useAppDispatch from '../../hooks/useAppDispatch';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import { useForm } from 'react-hook-form';
import { createFields, RestaurantCreateFormData } from '../../form-data/restaurant/RestaurantCreateFormData';

const RestaurantCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useStateHandling('restaurant');
  const methods = useForm();
  const formFields = useMemo(() => createFields({ methods }), [methods]);

  const handleFormSubmit = (data: RestaurantCreateFormData) => {
    dispatch(createRestaurant(data));
  };

  return (
    <StatusHandler status={status} error={error}>
      <Container mt={5}>
        <Text fontSize="2xl" mb={5}>
          Add Restaurant
        </Text>
        <Form fields={formFields} onSubmit={handleFormSubmit} submitText="Add Restaurant" methods={methods} />
      </Container>
    </StatusHandler>
  );
};

export default RestaurantCreate;
