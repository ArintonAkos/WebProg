import React, { useCallback } from 'react';
import { Box, Button, Text, Image, Flex, IconButton } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCustomToast } from '../../../hooks/useCustomToast';
import { CloseIcon } from '@chakra-ui/icons';

interface ImageUploadProps {
  onUploadedFiles: (files: File[]) => void;
  onDeleteFile: (file: File | string, type: 'new' | 'existing') => void;
  files: Array<File>;
  existingImages?: Array<string>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadedFiles, files, existingImages = [], onDeleteFile }) => {
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
        {existingImages.map((file, index) => (
          <Box position="relative" key={`file-index`}>
            <Image
              src={typeof file === 'string' ? file : URL.createObjectURL(file)}
              alt="uploaded preview"
              width="calc(33.3% - 6px)"
              objectFit="cover"
              borderRadius="md"
              mb={2}
              mr={(index + 1) % 3 !== 0 ? 2 : 0}
            />
            <IconButton
              icon={<CloseIcon />}
              aria-label="Delete"
              position="absolute"
              top={2}
              right={2}
              onClick={() => onDeleteFile(file, 'existing')}
            />
          </Box>
        ))}
        {files.map((file, index) => (
          <Box position="relative" key={`new-${index}`}>
            <Image
              src={URL.createObjectURL(file)}
              alt="uploaded preview"
              width="calc(33.3% - 6px)"
              objectFit="cover"
              borderRadius="md"
              mb={2}
              mr={(index + 1) % 3 !== 0 ? 2 : 0}
            />
            <IconButton
              icon={<CloseIcon />}
              aria-label="Delete"
              position="absolute"
              top={2}
              right={2}
              onClick={() => onDeleteFile(file, 'new')}
            />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default ImageUpload;
