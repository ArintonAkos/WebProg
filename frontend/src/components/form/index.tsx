import React, { Fragment, useEffect } from 'react';
import { Control, FieldError, FieldErrorsImpl, Merge, useForm } from 'react-hook-form';
import { SelectOption } from './elements/Select';
import FormField from './formField';
import {
  Button,
  CheckboxGroupProps,
  CheckboxProps,
  InputProps,
  SelectProps,
  Stack,
  TextareaProps,
} from '@chakra-ui/react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

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
  settings?: InputProps | SelectProps | CheckboxProps | CheckboxGroupProps | TextareaProps;
  element?: string;
  value?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  autoComplete?: string;
};

type Portal = {
  index: number;
  element: React.ReactNode;
};

type FormProps = {
  fields: FormFieldProps[];
  submitText?: string;
  onSubmit: (data: any) => any;
  portals?: Portal[];
  validationSchema?: Joi.Schema;
};

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitText, portals, validationSchema }) => {
  const resolver = validationSchema ? joiResolver(validationSchema) : undefined;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: resolver,
  });

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.name, field.value);
    });
  }, [fields, setValue]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const getPortalElement = (index: number) => {
    const filteredPortals = portals?.filter((portal) => portal.index === index);
    return filteredPortals?.map((portal) => portal.element);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={4}>
        {fields.map((field, index) => (
          <Fragment key={index}>
            {getPortalElement(index)}
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
              value={field.value}
              key={field.name}
              element={field.element}
              error={errors[field.name]}
              autoComplete={field.autoComplete}
            />
          </Fragment>
        ))}
        {getPortalElement(fields.length)}
        <Button colorScheme="blue" type="submit">
          {submitText ?? 'Submit'}
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
