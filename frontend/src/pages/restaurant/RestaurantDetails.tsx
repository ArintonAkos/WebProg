import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, VStack, Text, Flex, Box, ButtonGroup, Button } from '@chakra-ui/react';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurant } from '../../actions/restaurantActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Restaurant from '../../models/restaurant';
import ImageCarousel from '../../components/shared/ImageCarousel';
import { EditIcon, Icon } from '@chakra-ui/icons';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { status, error } = useStateHandling('restaurant');
  const dispatch = useAppDispatch();
  const restaurant: Restaurant | undefined = useSelector((state: RootState) => state.restaurant.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, []);

  const handleEditClick = () => {
    navigate(`/restaurants/edit/${id}`);
  };

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={4} alignItems="start" width={{ base: '100%', md: '85%' }}>
        <Flex justifyContent="space-between" w="100%">
          <Heading fontSize="4xl" fontWeight="bold">
            {restaurant?.name}
          </Heading>
          <ButtonGroup>
            <Button colorScheme="teal" onClick={handleEditClick} leftIcon={<Icon as={EditIcon} />}>
              Edit Restaurant
            </Button>
          </ButtonGroup>
        </Flex>
        {restaurant?.images?.length && (
          <Box w="full">
            <ImageCarousel images={restaurant.images!} />
          </Box>
        )}
        <Flex direction="column" fontSize="lg" fontWeight="medium" lineHeight="taller">
          <Text>
            <Text as="span" fontWeight="semibold">
              City:
            </Text>{' '}
            {restaurant?.city}
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              Street:
            </Text>{' '}
            {restaurant?.street}
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              Phone:
            </Text>{' '}
            {restaurant?.phone}
          </Text>
          <Text>
            <Text as="span" fontWeight="semibold">
              Opening Hours:
            </Text>{' '}
            {restaurant?.openingHours}
          </Text>
        </Flex>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantDetails;
