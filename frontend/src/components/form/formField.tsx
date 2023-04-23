import React from 'react';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import Select, { SelectOption } from './elements/Select';
import Input from './elements/Input';
import { FormFieldProps, WithControl } from './index';
import { InputProps, SelectProps } from '@chakra-ui/react';

type FormFieldPropsWithControl = FormFieldProps & WithControl;

const FormField: React.FC<FormFieldPropsWithControl> = ({
  control,
  name,
  label,
  type,
  required,
  options,
  helperText,
  placeHolder,
  settings,
  element,
}) => {
  const renderedObject = (field: ControllerRenderProps) => {
    switch (element) {
      case 'select':
        return (
          <Select
            options={options!}
            label={label}
            helperText={helperText}
            isRequired={required}
            field={field}
            settings={settings as SelectProps}
          />
        );
      default:
        return (
          <Input
            label={label}
            helperText={helperText}
            isRequired={required}
            field={field}
            placeHolder={placeHolder}
            type={type}
            settings={settings as InputProps}
          />
        );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: required }}
      render={({ field }) => renderedObject(field)}
    />
  );
};

export default FormField;
