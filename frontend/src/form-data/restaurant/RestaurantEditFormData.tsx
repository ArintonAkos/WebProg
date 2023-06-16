import { UseFormReturn } from 'react-hook-form';
import TableFields from '../../components/pages/restaurant/TableFields';
import React from 'react';

interface EditFieldsProps {
  methods: UseFormReturn<any>;
}

export const editFieldsProps = ({ methods }: EditFieldsProps) => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeHolder: 'Arinton Akos',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    required: true,
    placeHolder: 'Kolozsvar',
  },
  {
    name: 'street',
    label: 'Street',
    type: 'text',
    required: true,
    placeHolder: 'Farkas utca',
  },
  {
    name: 'number',
    label: 'Number',
    type: 'text',
    required: true,
    placeHolder: '5',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: true,
    placeHolder: '(+40) 712 345 678',
  },
  {
    name: 'openingHours',
    label: 'Opening Hours',
    type: 'text',
    required: true,
    placeHolder: '8:00 - 16:00',
  },
  {
    name: 'tables',
    label: 'Tables',
    customComponent: <TableFields methods={methods} name="tables" label="Tables" />,
  },
];
