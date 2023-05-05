import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
  CheckboxGroup as ChakraCheckboxGroup,
  CheckboxProps,
} from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

export interface CheckboxOptions {
  label: string;
  value: string;
}

type CustomCheckboxGroupProps = {
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  field: ControllerRenderProps;
  options: Array<CheckboxOptions>;
  settings?: CheckboxProps;
};

const CheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
  label,
  helperText,
  isRequired,
  field,
  options,
  settings,
}) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraCheckboxGroup {...field}>
        {options.map((option, index) => (
          <Checkbox key={index} value={option.value} {...settings}>
            {option.label}
          </Checkbox>
        ))}
      </ChakraCheckboxGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxGroup;
