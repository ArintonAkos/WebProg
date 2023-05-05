import React from 'react';
import { FormControl, FormLabel, FormHelperText, Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

type CustomCheckboxProps = {
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  field: ControllerRenderProps;
  settings?: CheckboxProps;
};

const Checkbox: React.FC<CustomCheckboxProps> = ({ label, helperText, isRequired, field, settings }) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraCheckbox {...field} {...settings}>
        {label}
      </ChakraCheckbox>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
