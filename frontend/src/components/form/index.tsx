import React, { Fragment, useEffect } from 'react';
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
  value?: string;
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
};

export type FormPropsWithControl = FormProps & WithControl;

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitText, portals }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.name, field.value);
    });
  }, fields);

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
