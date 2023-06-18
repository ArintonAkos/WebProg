import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import Restaurant, { MinimalRestaurantData } from '../../../models/restaurant';
import { fetchRestaurant } from '../../../actions/restaurantActions';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../shared/Loading';
import { API_BASE_URL } from '../../../services/createAuthClient';
import useAbility from '../../../hooks/useAbility';
import { EditIcon, Icon } from '@chakra-ui/icons';

interface RestaurantCardProps {
  restaurant: Restaurant | MinimalRestaurantData;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ability = useAbility();

  const handleDetailsClick = async () => {
    if (!('street' in restaurant)) {
      setIsLoading(true);
      await dispatch(fetchRestaurant(restaurant._id));
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    navigate(`/restaurants/edit/${restaurant._id}`);
  };

  const image = restaurant.images?.[0] ? `${API_BASE_URL}${restaurant.images[0]}` : '/img-not-available.png';

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Skeleton isLoaded={imageLoaded}>
        <Image src={image} alt="Image" objectFit="cover" h="400px" w="full" onLoad={() => setImageLoaded(true)} />
      </Skeleton>

      <Box p="6">
        <Box display="flex" alignItems="baseline" flexDirection="column">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="lg"
            textTransform="uppercase"
            ml="2"
          >
            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
          </Box>
          <VStack alignItems="start">
            <Text>City: {restaurant.city}</Text>
            <Text>Opening Hours: {restaurant.openingHours}</Text>
            {ability.can('update', 'Restaurant') && (
              <Button
                size="sm"
                width="100%"
                colorScheme="blue"
                onClick={handleEditClick}
                leftIcon={<Icon as={EditIcon} />}
              >
                Edit
              </Button>
            )}
          </VStack>
        </Box>
      </Box>

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton onClick={handleDetailsClick}>{isLoading ? 'Loading...' : 'More Details'}</AccordionButton>
          <AccordionPanel>
            {isLoading && <Loading />}
            {!isLoading && 'street' in restaurant && (
              <>
                <Text>City: {restaurant.city}</Text>
                <Text>Street: {restaurant.street}</Text>
                <Text>Phone: {restaurant.phone}</Text>
                <Text>Opening hours: {restaurant.openingHours}</Text>
              </>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default RestaurantCard;
