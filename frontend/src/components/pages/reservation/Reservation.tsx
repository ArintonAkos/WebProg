import { Box, Button, Text } from '@chakra-ui/react';
import ReservationModel from '../../../models/reservation';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { deleteReservation } from '../../../actions/reservationActions';
import React from 'react';

type ReservationProps = {
  reservation: ReservationModel;
};

const Reservation: React.FC<ReservationProps> = ({ reservation }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteReservation({ id: reservation._id }));
  };

  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <Text fontWeight="bold" fontSize="xl">
        Reservation for: {reservation.name}
      </Text>
      <Text fontSize="md">Restaurant ID: {reservation.restaurantId.name}</Text>
      <Text fontSize="md">Time: {new Date(reservation.time).toLocaleString()}</Text>
      <Text fontSize="md">Number of Guests: {reservation.numberOfGuests}</Text>
      <Text fontSize="md">Contact Info: {reservation.contactInfo}</Text>
      <Text fontSize="md">Status: {reservation.status}</Text>
      <Button colorScheme="red" onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default Reservation;
