import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Form from '../../form';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createReservation } from '../../../actions/reservationActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { clearData } from '../../../reducers/reservationReducer';
import { fetchReservedTables } from '../../../actions/reservationActions';
import useStateHandling from '../../../hooks/useStateHandling';
import {
  createFields,
  createReservationSchema,
  ReservationFormFields,
} from '../../../form-data/reservation/ReservationFormData';
import { FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react';
import Tables from './Tables';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const ReservationForm: React.FC<{ id: string }> = ({ id }) => {
  useStateHandling('reservation');
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.reservation.data);
  const user = useSelector((state: RootState) => state.auth.userData.user);
  const methods = useForm<ReservationFormFields>({
    resolver: joiResolver(createReservationSchema),
  });
  const tables = useSelector((state: RootState) => state.restaurant.restaurant.details?.tables ?? []);
  const { watch } = methods;

  const dateValue = watch('date');
  const timeValue = watch('time');

  const formFields = useMemo(() => {
    return createFields({
      isAuthenticated: !!user,
      email: user?.email,
      phone: user?.phone,
    });
  }, [user]);

  const [tableIds, setTableIds] = useState<string[]>([]);
  const [tableErrorMessage, setTableErrorMessage] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (formData: ReservationFormFields) => {
    if (!tableIds.length) {
      setTableErrorMessage('Please select at least one table!');
      return;
    }

    dispatch(
      createReservation({
        id,
        data: {
          ...formData,
          tableIds,
        },
      }),
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(clearData());
      navigate('/');
    }
  }, [data, navigate, dispatch]);

  useEffect(() => {
    if (!dateValue || !timeValue) {
      return;
    }

    dispatch(
      fetchReservedTables({
        restaurantId: id,
        date: dateValue,
        time: timeValue,
      }),
    );
    setTableIds([]);
    setTableErrorMessage(undefined);
  }, [dateValue, timeValue, id, dispatch]);

  const handleTableClick = useCallback(
    (tableId: string) => {
      setTableIds((prev) => {
        const index = prev.indexOf(tableId);

        if (index > -1) {
          return prev.filter((id) => id !== tableId);
        }

        setTableErrorMessage(undefined);
        return [...prev, tableId];
      });
    },
    [setTableIds, setTableErrorMessage],
  );

  console.log(tables, tableIds);

  const portals = useMemo(
    () => [
      {
        index: 0,
        element: (
          <FormControl isInvalid={!!tableErrorMessage} isRequired>
            <FormLabel>Table</FormLabel>
            <Tables onTableClick={handleTableClick} tables={tables} selectedTableIds={tableIds} />
            <FormErrorMessage>{tableErrorMessage}</FormErrorMessage>
          </FormControl>
        ),
      },
    ],
    [handleTableClick, tables, tableIds, tableErrorMessage],
  );

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Make a Reservation
      </Text>
      {!!tables.length && (
        <Form
          methods={methods}
          fields={formFields}
          onSubmit={handleSubmit}
          submitText="Make Reservation"
          portals={portals}
        />
      )}
      {!tables.length && (
        <Text fontSize="xl" mb={4}>
          No tables available. Can't make reservation at this time!
        </Text>
      )}
    </>
  );
};

export default ReservationForm;
