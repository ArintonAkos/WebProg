import * as React from 'react';
import { Box, Button, ChakraProvider, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../../components/shared/table/DataTable';
import Reservation from '../../models/reservation';
import StatusHandler from '../../components/shared/StatusHandler';
import useStateHandling from '../../hooks/useStateHandling';
import { fetchReservations } from '../../actions/reservationActions';
import { useEffect, useMemo } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper<Reservation>();

const ManageReservations: React.FC = () => {
  const { status, error } = useStateHandling('reservation');
  const dispatch = useAppDispatch();
  const reservations = useSelector((state: RootState) => state.reservation.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor('restaurantId', {
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
        cell: () => (
          <Box>
            <IconButton aria-label="Accept" icon={<CheckIcon />} onClick={() => {}} />
            <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={() => {}} ml={4} />
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
        <DataTable columns={columns} data={reservations} />
      </VStack>
    </StatusHandler>
  );
};

export default ManageReservations;
