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

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();
  const restaurants: Restaurant[] = useSelector((state: RootState) => state.restaurant.data, shallowEqual);
  const { status, error } = useStateHandling('restaurant');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [navigate, dispatch]);

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
          {restaurants?.length > 0 &&
            restaurants.map((restaurant: Restaurant) => (
              <Box key={restaurant._id!} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
                <VStack alignItems="start" spacing={2}>
                  <Link to={`/restaurants/${restaurant._id!}`}>
                    <Heading size="md">{restaurant.name}</Heading>
                    <Box>{restaurant.city}</Box>
                  </Link>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => handleEditClick(restaurant._id!)}
                    leftIcon={<Icon as={EditIcon} />}
                  >
                    Edit
                  </Button>
                </VStack>
              </Box>
            ))}
        </SimpleGrid>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantList;
