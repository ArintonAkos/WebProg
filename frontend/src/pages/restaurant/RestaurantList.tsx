import React, { useEffect } from 'react';
import { Box, Heading, VStack, SimpleGrid, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { shallowEqual, useSelector } from 'react-redux';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurants } from '../../actions/restaurantActions';
import Restaurant from '../../models/restaurant';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import { EditIcon, Icon } from '@chakra-ui/icons';
import RestaurantCard from './RestaurantCard';

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurant.restaurants, shallowEqual);
  const { status, error } = useStateHandling('restaurant');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  const handleEditClick = (restaurantId: string) => {
    navigate(`/restaurants/edit/${restaurantId}`);
  };

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={8} alignItems="start">
        <Heading>Restaurants</Heading>
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          spacingX={{ base: 4, md: 10 }}
          spacingY={{ base: 4, md: 10 }}
          width={{ base: '100%', md: '80%' }}
        >
          {restaurants?.length > 0 && restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} />)}
        </SimpleGrid>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantList;
