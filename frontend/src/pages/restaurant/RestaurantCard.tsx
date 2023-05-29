import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Image,
  Box,
  Text,
  Button,
  Icon,
  Skeleton,
} from '@chakra-ui/react';
import Restaurant, { MinimalRestaurantData } from '../../models/restaurant';
import { fetchRestaurant } from '../../actions/restaurantActions';
import useAppDispatch from '../../hooks/useAppDispatch';
import { EditIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

interface RestaurantCardProps {
  restaurant: Restaurant | MinimalRestaurantData;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDetailsClick = async () => {
    setIsLoading(true);
    await dispatch(fetchRestaurant(restaurant._id));
    setIsLoading(false);
  };

  const handleEditClick = () => {
    navigate(`/restaurants/edit/${restaurant._id}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Skeleton isLoaded={!isLoading}>
        <Image src={restaurant.images?.[0]} alt={restaurant.name} fallbackSrc="/img-not-available.png" />
      </Skeleton>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
          </Box>
          <Button size="sm" colorScheme="blue" onClick={handleEditClick} leftIcon={<Icon as={EditIcon} />}>
            Edit
          </Button>
        </Box>
      </Box>

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton onClick={handleDetailsClick}>{isLoading ? 'Loading...' : 'More Details'}</AccordionButton>
          <AccordionPanel>
            {'street' in restaurant && (
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
