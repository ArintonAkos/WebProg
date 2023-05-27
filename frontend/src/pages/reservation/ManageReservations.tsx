import * as React from 'react';
import { Box, Heading, IconButton, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../../components/shared/table/DataTable';
import Reservation, { PopulatedReservation } from '../../models/reservation';
import StatusHandler from '../../components/shared/StatusHandler';
import useStateHandling from '../../hooks/useStateHandling';
import { changeReservationStatus, getManagedReservations } from '../../actions/reservationActions';
import { useEffect, useMemo } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper<PopulatedReservation>();

const ManageReservations: React.FC = () => {
  useStateHandling('reservation');

  const { status, error } = useStateHandling('reservation');
  const dispatch = useAppDispatch();
  const reservations = useSelector((state: RootState) => state.reservation.populatedReservations);

  useEffect(() => {
    dispatch(getManagedReservations());
  }, []);

  const handleAccept = (reservation: PopulatedReservation) => {
    dispatch(
      changeReservationStatus({
        id: reservation._id,
        data: {
          status: 'accepted',
        },
      }),
    );
  };

  const handleReject = (reservation: PopulatedReservation) => {
    dispatch(
      changeReservationStatus({
        id: reservation._id,
        data: {
          status: 'rejected',
        },
      }),
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('restaurantId.name', {
        cell: (info) => info.getValue(),
        header: 'Restaurant',
      }),
      columnHelper.accessor('time', {
        cell: (info) => new Date(info.getValue()).toLocaleString(),
        header: 'Date and Time',
      }),
      columnHelper.accessor('numberOfGuests', {
        cell: (info) => info.getValue(),
        header: 'Number of Guests',
      }),
      columnHelper.accessor('contactInfo', {
        cell: (info) => info.getValue(),
        header: 'Contact Info',
      }),
      columnHelper.accessor('status', {
        cell: (info) => info.getValue(),
        header: 'Status',
      }),
      columnHelper.display({
        id: 'manage',
        cell: ({ row }) => (
          <Box>
            <IconButton aria-label="Accept" icon={<CheckIcon />} onClick={() => handleAccept(row.original)} />
            <IconButton aria-label="Delete" icon={<CloseIcon />} onClick={() => handleReject(row.original)} ml={4} />
          </Box>
        ),
      }),
    ],
    [],
  );

  return (
    <StatusHandler status={status} error={error}>
      <VStack spacing={8} alignItems="start">
        <Heading>Manage Reservations</Heading>
        <Box width="100%" overflowX="auto">
          <DataTable columns={columns} data={reservations} />
        </Box>
      </VStack>
    </StatusHandler>
  );
};

export default ManageReservations;
