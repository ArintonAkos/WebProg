import React from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import Select from './elements/Select';
import Input from './elements/Input';
import Checkbox from './elements/Checkbox';
import CheckboxGroup from './elements/CheckboxGroup';
import TextArea from './elements/TextArea';
import { FormFieldProps, WithControl } from './index';
import { CheckboxProps, InputProps, SelectProps, TextareaProps } from '@chakra-ui/react';

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
  value,
}) => {
  const renderedObject = (field: ControllerRenderProps) => {
    console.log(name, settings, options, element);

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
      case 'checkbox':
        return <Checkbox label={label} field={field} settings={settings as CheckboxProps} />;
      case 'checkboxgroup':
        return (
          <CheckboxGroup
            options={options!}
            label={label}
            helperText={helperText}
            isRequired={required}
            field={field}
            settings={settings as CheckboxProps}
          />
        );
      case 'textarea':
        return (
          <TextArea
            label={label}
            helperText={helperText}
            isRequired={required}
            field={field}
            placeHolder={placeHolder}
            settings={settings as TextareaProps}
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
      defaultValue={value ?? ''}
      rules={{ required: required }}
      render={({ field }) => renderedObject(field)}
    />
  );
};

export default FormField;
