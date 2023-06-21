import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import Restaurant, { MinimalRestaurantData } from '../../../models/restaurant';
import Loading from '../../shared/Loading';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../../services/createAuthClient';

interface RestaurantPreviewProps {
  restaurant: Restaurant | MinimalRestaurantData;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const RestaurantPreview: React.FC<RestaurantPreviewProps> = ({ restaurant, isLoading, isOpen, onClose }) => {
  const imageSrc = restaurant.images?.[0] ? `${API_BASE_URL}${restaurant.images[0]}` : '/img-not-available.png';
  const [imageLoaded, setImageLoaded] = useState(false);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if ('street' in restaurant) {
    content = (
      <>
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
      </>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={3}>
        <ModalHeader>{restaurant.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box px={3}>
            <Skeleton isLoaded={imageLoaded} mb={3}>
              <Image
                src={imageSrc}
                alt="Image"
                objectFit="cover"
                h="400px"
                w="full"
                onLoad={() => setImageLoaded(true)}
              />
            </Skeleton>
            {content}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantPreview;
