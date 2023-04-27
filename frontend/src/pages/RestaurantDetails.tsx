import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';

// Replace this with actual data fetched from your API or Redux store
const restaurant = {
  id: 1,
  name: 'Restaurant 1',
  city: 'City 1',
  street: 'Street 1',
  phone: '123-456-7890',
  openingHours: '8:00 AM - 10:00 PM',
};

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch restaurant data using id, and update the restaurant variable

  return (
    <VStack spacing={4} alignItems="start">
      <Heading>{restaurant.name}</Heading>
      <Text>City: {restaurant.city}</Text>
      <Text>Street: {restaurant.street}</Text>
      <Text>Phone: {restaurant.phone}</Text>
      <Text>Opening Hours: {restaurant.openingHours}</Text>
    </VStack>
  );
};

export default RestaurantDetails;
