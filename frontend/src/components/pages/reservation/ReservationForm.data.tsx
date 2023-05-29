import { FormFieldProps } from '../../form';

export interface CreateReservationProps {
  userId: string;
  date: string;
  time: string;
  numberOfGuests: number;
}

export const fields: Array<FormFieldProps> = [
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
