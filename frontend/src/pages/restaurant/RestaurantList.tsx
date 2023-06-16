import React, { useEffect } from 'react';
import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { RootState } from '../../store';
import { shallowEqual, useSelector } from 'react-redux';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurants } from '../../actions/restaurantActions';
import RestaurantCard from '../../components/pages/restaurant/RestaurantCard';

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurant.restaurants, shallowEqual);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <VStack spacing={8} alignItems="start">
      <Heading>Restaurants</Heading>
      <SimpleGrid
        columns={{ base: 2, md: 4 }}
        spacingX={{ base: 4, md: 10 }}
        spacingY={{ base: 4, md: 10 }}
        width={{ base: '100%', md: '80%' }}
      >
        {restaurants?.length > 0 &&
          restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} key={restaurant._id} />)}
      </SimpleGrid>
    </VStack>
  );
};

export default RestaurantList;
