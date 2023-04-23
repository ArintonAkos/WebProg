import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { SelectOption } from './elements/Select';
import FormField from './formField';
import { Button, InputProps, SelectProps, Stack } from '@chakra-ui/react';

export type WithControl = {
  control: Control;
};

export type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: SelectOption[];
  helperText?: string;
  placeHolder?: string;
  settings?: InputProps | SelectProps;
  element?: string;
};

type FormProps = {
  fields: FormFieldProps[];
  submitText?: string;
  onSubmit: (data: any) => any;
};

export type FormPropsWithControl = FormProps & WithControl;

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitText }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={4}>
        {fields.map((field) => (
          <FormField
            control={control}
            name={field.name}
            label={field.label}
            type={field.type}
            required={field.required}
            options={field.options}
            helperText={field.helperText}
            placeHolder={field.placeHolder}
            settings={field.settings}
            key={field.name}
          />
        ))}
        <Button colorScheme="blue" type="submit">
          {submitText ?? 'Submit'}
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
