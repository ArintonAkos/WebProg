import React from 'react';
import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import RouteCard from '../components/pages/home/RouteCard';

const HomePage: React.FC = () => {
  const pages = [
    {
      name: 'Restaurants',
      path: '/',
      image: 'https://source.unsplash.com/random?restaurant',
      description: 'Browse our list of restaurants.',
    },
    {
      name: 'Add Restaurant',
      path: '/restaurant/add',
      image: 'https://source.unsplash.com/random?chef',
      description: 'Add a new restaurant to the list.',
    },
  ];

  return (
    <VStack spacing={8} alignItems="start">
      <Heading>Home</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={10} spacingY={10} width="100%">
        {pages.map((page, index) => -(<RouteCard key={index} {...page} />))}
      </SimpleGrid>
    </VStack>
  );
};

export default HomePage;
