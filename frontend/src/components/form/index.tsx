import React, { Fragment, useEffect } from 'react';
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormReturn } from 'react-hook-form';
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
  value?: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  autoComplete?: string;
  disabled?: boolean;
};

type Portal = {
  index: number;
  element: React.ReactNode;
};

type FormProps = {
  fields: FormFieldProps[];
  submitText?: string;
  onSubmit: (value: any) => void;
  portals?: Portal[];
  methods: UseFormReturn<any>;
};

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitText, portals, methods }) => {
  // const resolver = validationSchema ? joiResolver(validationSchema) : undefined;
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

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
    return filteredPortals?.map((portal: Portal, i) =>
      React.cloneElement(portal.element as any, { key: `portal-${index}-${i}` }),
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={4}>
        {fields.map((field, index) => (
          <Fragment key={`${field.name}-${index}`}>
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
