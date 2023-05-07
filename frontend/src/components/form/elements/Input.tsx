import React from 'react';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  FormHelperText,
  InputProps,
  FormErrorMessage,
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
  error?: boolean;
  errorMessage?: string;
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
  error,
  errorMessage,
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={error}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput {...field} placeholder={placeHolder} type={type} {...settings} />
        {icon && <InputRightElement children={icon} />}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
