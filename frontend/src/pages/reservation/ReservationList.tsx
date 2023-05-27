import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { fetchReservations } from '../../actions/reservationActions';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import Reservation from '../../components/pages/reservation/Reservation';
import { Navigate } from 'react-router-dom';
import useStateHandling from '../../hooks/useStateHandling';
import StatusHandler from '../../components/shared/StatusHandler';
import Info from '../../components/shared/Info';

const ReservationsList = () => {
  const user = useSelector((state: RootState) => state.auth.userData.user);
  const dispatch = useAppDispatch();
  const reservations = useSelector((state: RootState) => state.reservation.reservations);
  const { status, error } = useStateHandling('restaurant');

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  if (!user) {
    return <Navigate to={'/auth/login'} />;
  }

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={8} alignItems="start">
        <Heading>Reservations</Heading>

        {reservations?.length && (
          <SimpleGrid columns={1} width={{ base: '100%', md: '80%' }}>
            {reservations.map((reservation) => (
              <Reservation key={reservation._id} reservation={reservation} />
            ))}
          </SimpleGrid>
        )}
        {!reservations?.length && (
          <Info title="You have no reservations" description="You can make a reservation at the restaurant page" />
        )}
      </VStack>
    </StatusHandler>
  );
};

export default ReservationsList;
