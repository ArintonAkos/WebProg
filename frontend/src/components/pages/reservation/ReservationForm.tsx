import React, { useEffect, useState } from 'react';
import Form, { FormFieldProps } from '../../form';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createReservation } from '../../../actions/reservationActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { clearData } from '../../../reducers/reservationReducer';
import useStateHandling from '../../../hooks/useStateHandling';
import User from '../../../models/user';

const fields: Array<FormFieldProps> = [
  {
    name: 'userId',
    label: 'Contact Person',
    type: 'select',
    element: 'select',
    required: true,
    options: [],
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
  },
  {
    name: 'time',
    label: 'Time',
    type: 'time',
    required: true,
  },
  {
    name: 'numberOfGuests',
    label: 'Number of Guests',
    type: 'select',
    element: 'select',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ],
    value: '1',
    required: true,
  },
];

export interface CreateReservationProps {
  name: string;
  date: string;
  time: string;
  numberOfGuests: number;
  contactInfo: string;
}

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
        const nameField = prev.find((field) => field.name === 'userId')!;
        const otherFields = prev.filter((field) => field.name !== 'userId');

        if (nameField) {
          nameField.options = users.map((user) => ({ label: user.name, value: user._id }));

          if (nameField.options?.[0]) {
            nameField.value = nameField.options[0].value;
          }

          return [nameField, ...otherFields];
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
  }, [data, navigate]);

  return <Form fields={formFields} onSubmit={handleSubmit} submitText="Make Reservation" />;
};

export default ReservationForm;
