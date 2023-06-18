import React from 'react';
import { FormControl, FormLabel, FormHelperText, Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

type CustomTextareaProps = {
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  field: ControllerRenderProps;
  placeHolder?: string;
  settings?: TextareaProps;
  disabled?: boolean;
};

const TextArea: React.FC<CustomTextareaProps> = ({
  label,
  helperText,
  isRequired,
  field,
  placeHolder,
  settings,
  disabled,
}) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraTextarea {...field} placeholder={placeHolder} {...settings} disabled={disabled} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TextArea;
