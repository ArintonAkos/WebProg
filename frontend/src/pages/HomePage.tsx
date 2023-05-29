import React, { useMemo } from 'react';
import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import RouteCard from '../components/pages/home/RouteCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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
    authRequired: true,
  },
  {
    name: 'Manage Reservations',
    path: '/reservations/manage',
    image: 'https://source.unsplash.com/random?reservation',
    description: 'Manage your reservations here.',
    authRequired: true,
  },
  {
    name: 'Reservations',
    path: '/reservations',
    image: 'https://source.unsplash.com/random?reservation',
    description: 'View your reservations.',
    authRequired: true,
  },
  {
    name: 'Login',
    path: '/auth/login',
    image: 'https://source.unsplash.com/random?login',
    description: 'Login to your account.',
    authRequired: false,
  },
  {
    name: 'Logout',
    path: '/auth/logout',
    image: 'https://source.unsplash.com/random?logout',
    description: 'Logout from your account.',
    authRequired: true,
  },
  {
    name: 'Register',
    path: '/auth/register',
    image: 'https://source.unsplash.com/random?register',
    description: 'Register for an account.',
    authRequired: false,
  },
];

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userData.user);

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      if (page.authRequired === undefined) {
        return true;
      }

      return !!((user && page.authRequired) || (!user && !page.authRequired));
    });
  }, [user]);

  return (
    <VStack spacing={8} alignItems="start">
      <Heading>Home</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={10} spacingY={10} width="100%">
        {filteredPages.map((page, index) => (
          <RouteCard key={index} {...page} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default HomePage;
