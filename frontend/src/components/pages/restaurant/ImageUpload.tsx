import React, { useCallback } from 'react';
import { Box, Button, Text, Image, Flex } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCustomToast } from '../../../hooks/useCustomToast';

interface ImageUploadProps {
  onUploadedFiles: (files: File[]) => void;
  files: Array<File>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadedFiles, files }) => {
  const toast = useCustomToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUploadedFiles(acceptedFiles);

      toast({
        description: 'Images uploaded successfully.',
        type: 'success',
        title: 'Success',
        isClosable: true,
      });
    },
    [toast, onUploadedFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <>
      <Box
        {...getRootProps()}
        border="2px"
        borderRadius="md"
        p={4}
        borderColor={isDragActive ? 'blue.300' : 'gray.300'}
        borderWidth={isDragActive ? 2 : 1}
        cursor="pointer"
        textAlign="center"
        _hover={{ borderColor: 'blue.500' }}
      >
        <input {...getInputProps()} />
        <Text mb={2}>
          {isDragActive ? 'Drop the images here ...' : 'Drag and drop images, or click to select files'}
        </Text>
        <Button colorScheme="blue" variant="outline">
          Upload Images
        </Button>
      </Box>
      <Flex direction="row" flexWrap="wrap" mt={2}>
        {files.map((preview, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(preview)}
            alt="uploaded preview"
            width="calc(33.3% - 6px)"
            objectFit="cover"
            borderRadius="md"
            mb={2}
            mr={(index + 1) % 3 !== 0 ? 2 : 0}
          />
        ))}
      </Flex>
    </>
  );
};

export default ImageUpload;
