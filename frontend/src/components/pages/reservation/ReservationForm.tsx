import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
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
    name: 'name',
    label: 'Name',
    type: 'select',
    element: 'select',
    required: true,
    placeHolder: 'Arinton Akos',
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
    ],
    value: '1',
    required: true,
  },
  {
    name: 'contactInfo',
    label: 'Contact Info',
    type: 'text',
    required: true,
    placeHolder: 'Email or phone number',
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
  const users: Array<User> | undefined = useSelector((state: RootState) => state.restaurant.data?.users);
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
    if (users) {
      setFormFields((prev) => {
        const nameField = prev.find((field) => field.name === 'name')!;
        const otherFields = prev.filter((field) => field.name !== 'name');

        if (nameField) {
          nameField.options = users.map((user) => ({ label: user.name, value: user.name }));
        }

        return [nameField, ...otherFields];
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
