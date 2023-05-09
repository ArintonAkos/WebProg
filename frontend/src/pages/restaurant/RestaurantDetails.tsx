import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Heading,
  VStack,
  Text,
  Flex,
  Box,
  ButtonGroup,
  Button,
  useBreakpointValue,
  ResponsiveValue,
} from '@chakra-ui/react';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchRestaurant, uploadImages } from '../../actions/restaurantActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ImageCarousel from '../../components/shared/ImageCarousel';
import { EditIcon, Icon } from '@chakra-ui/icons';
import ReservationForm from '../../components/pages/reservation/ReservationForm';
import ImageUpload from '../../components/pages/restaurant/ImageUpload';
import Form from '../../components/form';

interface ResponsiveStyles {
  flexDirection: ResponsiveValue<any>;
  leftPadding: ResponsiveValue<any>;
  topMargin: ResponsiveValue<any>;
}

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { status, error } = useStateHandling('restaurant');
  const dispatch = useAppDispatch();
  const restaurant = useSelector((state: RootState) => state.restaurant.restaurant.details);
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    dispatch(fetchRestaurant(id));
  }, []);

  const handleEditClick = () => {
    navigate(`/restaurants/edit/${id}`);
  };

  const handleImageUpload = (uploadedFiles: File[]) => {
    setFiles([...uploadedFiles]);
  };

  const handleFormSubmit = () => {
    dispatch(
      uploadImages({
        id,
        restaurant: {
          images: files,
        },
      }),
    );
    setFiles([]);
  };

  const { flexDirection, leftPadding, topMargin }: ResponsiveStyles = useBreakpointValue({
    base: { flexDirection: 'column', leftPadding: 0, topMargin: 4 },
    md: { flexDirection: 'row', leftPadding: 4, topMargin: 0 },
  })!;

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={4} alignItems="start">
        <Flex justifyContent="space-between" w="100%" flexDirection={flexDirection}>
          <Heading fontSize="4xl" fontWeight="bold">
            {restaurant?.name}
          </Heading>
          <ButtonGroup mt={topMargin}>
            <Button colorScheme="blue" onClick={handleEditClick} leftIcon={<Icon as={EditIcon} />}>
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
        <Flex w="100%" direction={flexDirection} justifyContent="space-between" alignItems="flex-start">
          <Flex direction="column" flex={1} width="100%">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Make a Reservation
            </Text>
            <ReservationForm id={id!} />
          </Flex>
          <Flex pl={leftPadding} direction="column" mt={topMargin} flex={1} width="100%">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Upload Images
            </Text>
            <ImageUpload onUploadedFiles={handleImageUpload} files={files} />
            <Form fields={[]} onSubmit={handleFormSubmit} />
          </Flex>
        </Flex>
      </VStack>
    </StatusHandler>
  );
};

export default RestaurantDetails;
