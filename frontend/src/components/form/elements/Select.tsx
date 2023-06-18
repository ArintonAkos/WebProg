import React from 'react';
import { FormControl, FormLabel, Select as ChakraSelect, FormHelperText, SelectProps } from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  helperText?: string;
  options: SelectOption[];
  isRequired?: boolean;
  field: ControllerRenderProps;
  settings?: SelectProps;
}

type OmitSizeProp = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>;
const Select: React.FC<CustomSelectProps & OmitSizeProp & SelectProps> = ({
  label,
  helperText,
  options,
  isRequired,
  field,
  settings,
  disabled,
}) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraSelect {...field} {...settings} disabled={disabled}>
        {options.map((option: SelectOption, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
