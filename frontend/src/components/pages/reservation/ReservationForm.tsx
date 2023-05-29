import React, { useEffect, useState } from 'react';
import Form from '../../form';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createReservation } from '../../../actions/reservationActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { clearData } from '../../../reducers/reservationReducer';
import useStateHandling from '../../../hooks/useStateHandling';
import User from '../../../models/user';
import { CreateReservationProps, fields } from './ReservationForm.data';

const ReservationForm: React.FC<{ id: string }> = ({ id }) => {
  useStateHandling('reservation');
  const users: Array<User> = useSelector((state: RootState) => state.restaurant.restaurant.users);
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.reservation.data);
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(fields);

  const handleSubmit = async (formData: CreateReservationProps) => {
    dispatch(
      createReservation({
        id,
        data: formData,
      }),
    );
  };

  useEffect(() => {
    if (users.length) {
      setFormFields((prev) => {
        const userIdField = prev.find((field) => field.name === 'userId')!;
        const otherFields = prev.filter((field) => field.name !== 'userId');

        if (userIdField) {
          userIdField.options = users.map((user) => ({ label: user.name, value: user._id }));

          if (userIdField.options?.[0]) {
            userIdField.value = userIdField.options[0].value;
          }

          return [userIdField, ...otherFields];
        }

        return otherFields;
      });
    }
  }, [users]);

  useEffect(() => {
    if (data) {
      dispatch(clearData());
      navigate('/');
    }
  }, [data, navigate, dispatch]);

  return <Form fields={formFields} onSubmit={handleSubmit} submitText="Make Reservation" />;
};

export default ReservationForm;
