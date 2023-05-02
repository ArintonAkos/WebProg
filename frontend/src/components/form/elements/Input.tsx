import React from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  FormHelperText,
  InputProps,
} from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

type CustomInputProps = {
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  isRequired?: boolean;
  field: ControllerRenderProps;
  placeHolder?: string;
  settings?: InputProps;
  type?: string;
};

const Input: React.FC<CustomInputProps> = ({
  label,
  helperText,
  icon,
  isRequired,
  field,
  placeHolder,
  settings,
  type,
}) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput {...field} placeholder={placeHolder} type={type} {...settings} />
        {icon && <InputRightElement children={icon} />}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
