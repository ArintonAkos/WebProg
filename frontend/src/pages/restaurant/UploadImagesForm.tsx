import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import Form, { FormFieldProps } from '../../components/form';
import { useParams } from 'react-router-dom';

const fields: Array<FormFieldProps> = [
  {
    name: 'images',
    label: 'Images',
    type: 'file',
    settings: {
      multiple: true,
    },
  },
];

const UploadImagesForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const handleFormSubmit = (data: any) => {};

  return (
    <Container mt={5}>
      <Text fontSize="2xl" mb={5}>
        Upload Images
      </Text>
      <Form fields={fields} onSubmit={handleFormSubmit} submitText="Upload Images"></Form>
    </Container>
  );
};

export default UploadImagesForm;
