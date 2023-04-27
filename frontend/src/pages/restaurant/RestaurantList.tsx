import React, { useEffect } from 'react';
import { Box, Heading, VStack, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { shallowEqual, useSelector } from 'react-redux';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurants } from '../../actions/restaurantActions';
import Restaurant from '../../models/restaurant';
import withStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const restaurants: Restaurant[] = useSelector((state: RootState) => state.restaurant.data, shallowEqual);
  const { status, error } = withStateHandling('restaurant');

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

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
          {restaurants &&
            restaurants.map((restaurant: Restaurant) => (
              <Box key={restaurant._id!} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
                <Link to={`/restaurants/${restaurant._id!}`}>
                  <Heading size="md">{restaurant.name}</Heading>
                  <Box>{restaurant.city}</Box>
                </Link>
              </Box>
            ))}
        </SimpleGrid>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantList;
