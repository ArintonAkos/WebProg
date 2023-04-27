import React from 'react';
import { Box, Heading, VStack, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Replace this with actual data fetched from your API or Redux store
const restaurants = [
  { id: 1, name: 'Restaurant 1', city: 'City 1' },
  { id: 2, name: 'Restaurant 2', city: 'City 2' },
  { id: 3, name: 'Restaurant 3', city: 'City 3' },
];

const RestaurantList: React.FC = () => {
  return (
    <VStack spacing={8} alignItems="start">
      <Heading>Restaurants</Heading>
      <SimpleGrid columns={3} spacing={10}>
        {restaurants.map((restaurant) => (
          <Box key={restaurant.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
            <Link to={`/restaurants/${restaurant.id}`}>
              <Heading size="md">{restaurant.name}</Heading>
              <Box>{restaurant.city}</Box>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default RestaurantList;
