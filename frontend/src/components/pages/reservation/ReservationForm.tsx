import React, { useEffect, useMemo, useState } from 'react';
import Form from '../../form';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createReservation } from '../../../actions/reservationActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { clearData } from '../../../reducers/reservationReducer';
import useStateHandling from '../../../hooks/useStateHandling';
import { CreateReservationProps, createFields, ReservationFormFields } from './ReservationForm.data';
import { Text } from '@chakra-ui/react';
import Tables from './Tables';

const ReservationForm: React.FC<{ id: string }> = ({ id }) => {
  useStateHandling('reservation');
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.reservation.data);
  const user = useSelector((state: RootState) => state.auth.userData.user);
  const formFields = useMemo(() => {
    return createFields({
      isAuthenticated: !!user,
      email: user?.email,
      phone: user?.phone,
    });
  }, [user]);

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
    // setTableIds([tableId]);
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Make a Reservation
      </Text>
      <Form
        fields={formFields}
        onSubmit={handleSubmit}
        submitText="Make Reservation"
        portals={[
          {
            index: 0,
            element: <Tables onTableClick={handleTableClick} />,
          },
        ]}
      />
      ;
    </>
  );
};

export default ReservationForm;
