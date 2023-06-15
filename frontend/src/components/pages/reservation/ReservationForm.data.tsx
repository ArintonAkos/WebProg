import { FormFieldProps } from '../../form';

export interface CreateReservationProps {
  email: string;
  name: string;
  date: string;
  time: string;
  tableIds: Array<string>;
}

export type CreateFieldsProps = {
  isAuthenticated: boolean;
  email?: string;
  phone?: string;
};

export const createFields = ({ isAuthenticated, email, phone }: CreateFieldsProps): FormFieldProps[] => {
  return [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      value: email,
      required: true,
      disabled: isAuthenticated,
    },
    {
      name: 'Phone',
      label: 'Phone',
      type: 'text',
      value: phone,
      required: true,
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
      type: 'text',
      required: true,
      value: '1',
    },
  ];
};
