import { FormFieldProps } from '../../components/form';
import Joi from 'joi';
import moment from 'moment';

export const createReservationSchema = Joi.object({
  email: Joi.string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.pattern.base': 'Email must be a valid email address.',
      'any.required': 'Email is required.',
    }),
  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({
      'string.base': 'Time must be a string.',
      'string.pattern.base': 'Time must be in the format HH:mm.',
      'any.required': 'Time is required.',
    }),
  numberOfGuests: Joi.number().integer().min(1).required().messages({
    'number.base': 'Number of guests must be a number.',
    'number.integer': 'Number of guests must be an integer.',
    'number.min': 'Number of guests must be at least 1.',
    'any.required': 'Number of guests is required.',
  }),
  phone: Joi.string()
    .pattern(/^[0-9 ]*$/)
    .required(),
  date: Joi.date().min('now').iso().required().messages({
    'date.base': 'Date must be a date string.',
    'date.min': 'Date must be today or in the future.',
    'date.isoDate': 'Date must be in the ISO format (YYYY-MM-DD).',
    'any.required': 'Date is required.',
  }),
});

export interface CreateReservationProps {
  email: string;
  name: string;
  date: string;
  time: string;
  numberOfGuests: number;
  tableIds: Array<string>;
}

export type CreateFieldsProps = {
  isAuthenticated: boolean;
  email?: string;
  phone?: string;
  onDateChange?: (date: string) => void;
  onTimeChange?: (time: string) => void;
};

export type ReservationFormFields = {
  email: string;
  name: string;
  date: string;
  time: string;
  numberOfGuests: number;
  tableIds: Array<string>;
};

export const createFields = ({ isAuthenticated, email, phone }: CreateFieldsProps): FormFieldProps[] => {
  const today = moment().format('YYYY-MM-DD');
  const currentTime = moment().format('HH:mm');

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
      name: 'phone',
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
      settings: {
        min: today,
      },
      value: today,
    },
    {
      name: 'time',
      label: 'Time',
      type: 'time',
      required: true,
      value: currentTime,
    },
    {
      name: 'numberOfGuests',
      label: 'Number of Guests',
      type: 'number',
      element: 'input',
      required: true,
      value: 1,
    },
  ];
};
