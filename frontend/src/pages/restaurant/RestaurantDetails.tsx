import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  ResponsiveValue,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurant } from '../../actions/restaurantActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ImageCarousel from '../../components/shared/ImageCarousel';
import ReservationForm from '../../components/pages/reservation/ReservationForm';
import useAbility from '../../hooks/useAbility';
import { EditIcon, Icon } from '@chakra-ui/icons';

interface ResponsiveStyles {
  flexDirection: ResponsiveValue<any>;
  topMargin: ResponsiveValue<any>;
}

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { status, error } = useStateHandling('restaurant');
  const dispatch = useAppDispatch();
  const restaurant = useSelector((state: RootState) => state.restaurant.restaurant.details);
  const navigate = useNavigate();
  const ability = useAbility();

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, [dispatch, id]);

  const handleEditClick = () => {
    navigate(`/restaurants/edit/${id}`);
  };

  const { flexDirection, topMargin }: ResponsiveStyles = useBreakpointValue({
    base: { flexDirection: 'column', topMargin: 4 },
    md: { flexDirection: 'row', topMargin: 0 },
  })!;

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={4} alignItems="start">
        <Flex justifyContent="space-between" w="100%" flexDirection={flexDirection}>
          <Heading fontSize="4xl" fontWeight="bold">
            {restaurant?.name}
          </Heading>
          {ability.can('update', 'Restaurant') && (
            <ButtonGroup mt={topMargin}>
              <Button colorScheme="blue" onClick={handleEditClick} leftIcon={<Icon as={EditIcon} />}>
                Edit Restaurant
              </Button>
            </ButtonGroup>
          )}
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
        <Flex w="100%" justifyContent="space-between" alignItems="flex-start">
          <Flex direction="column" flex={1} width="100%">
            <ReservationForm id={id!} />
          </Flex>
        </Flex>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantDetails;
