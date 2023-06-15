import React, { useEffect, useMemo, useState } from 'react';
import Form from '../../form';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createReservation } from '../../../actions/reservationActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { clearData } from '../../../reducers/reservationReducer';
import { fetchReservedTables } from '../../../actions/reservationActions';
import useStateHandling from '../../../hooks/useStateHandling';
import { createFields, createReservationSchema, ReservationFormFields } from './ReservationForm.data';
import { FormLabel, Text } from '@chakra-ui/react';
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

  const dateValue = methods.watch('date');
  const timeValue = methods.watch('time');

  const formFields = useMemo(() => {
    const handleChange = () => {
      dispatch(
        fetchReservedTables({
          restaurantId: id,
          date: dateValue,
          time: timeValue,
        }),
      );
    };

    return createFields({
      isAuthenticated: !!user,
      email: user?.email,
      phone: user?.phone,
      onTimeChange: handleChange,
      onDateChange: handleChange,
    });
  }, [user, dispatch, dateValue, timeValue, id]);

  const [tableIds, setTableIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (formData: ReservationFormFields) => {
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

  const handleTableClick = (tableId: string) => {
    console.log(tableId);
    setTableIds((prev) => {
      const index = prev.indexOf(tableId);

      if (index > -1) {
        return prev.filter((id) => id !== tableId);
      }

      return [...prev, tableId];
    });
  };

  const portals = useMemo(
    () => [
      {
        index: 0,
        element: (
          <>
            <FormLabel>Table</FormLabel>
            <Tables onTableClick={handleTableClick} tables={tables} selectedTableIds={tableIds} />
          </>
        ),
      },
    ],
    [handleTableClick],
  );

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Make a Reservation
      </Text>
      <Form
        methods={methods}
        fields={formFields}
        onSubmit={handleSubmit}
        submitText="Make Reservation"
        portals={portals}
      />
    </>
  );
};

export default ReservationForm;
