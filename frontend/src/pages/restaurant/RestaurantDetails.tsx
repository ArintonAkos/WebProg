import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, VStack, Text } from '@chakra-ui/react';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurant } from '../../actions/restaurantActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Restaurant from '../../models/restaurant';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { status, error } = useStateHandling('restaurant');
  const dispatch = useAppDispatch();
  const restaurant: Restaurant | undefined = useSelector((state: RootState) => state.restaurant.data);

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, []);

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={4} alignItems="start">
        <Heading>{restaurant?.name}</Heading>
        <Text>City: {restaurant?.city}</Text>
        <Text>Street: {restaurant?.street}</Text>
        <Text>Phone: {restaurant?.phone}</Text>
        <Text>Opening Hours: {restaurant?.openingHours}</Text>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantDetails;
