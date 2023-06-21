import React, { useCallback } from 'react';
import { Box, Button, Text, Image, IconButton, VStack } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCustomToast } from '../../../hooks/useCustomToast';
import { CloseIcon } from '@chakra-ui/icons';
import { API_BASE_URL } from '../../../services/createAuthClient';

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

  const renderImages = (images: Array<File | string>, existingLength: number) => {
    const getType = (index: number) => {
      if (index >= existingLength) {
        return 'new';
      }

      return 'existing';
    };

    return images.map((image, index) => {
      const type = getType(index);

      return (
        <Box width="48%" p={2} display="flex" justifyContent="center" key={`${type}-image-${index}`}>
          <Box position="relative">
            <Image
              src={typeof image === 'string' ? `${API_BASE_URL}${image}` : URL.createObjectURL(image)}
              alt="uploaded preview"
              borderRadius="md"
              objectFit="cover"
              maxWidth="200px"
              maxHeight="200px"
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            />
            <IconButton
              icon={<CloseIcon />}
              aria-label="Delete"
              position="absolute"
              top={1}
              right={1}
              onClick={() => onDeleteFile(image, type)}
            />
          </Box>
        </Box>
      );
    });
  };

  const images = [...existingImages, ...files];

  return (
    <VStack spacing={4}>
      <Box
        {...getRootProps()}
        border="2px"
        borderRadius="md"
        p={4}
        borderColor={isDragActive ? 'blue.300' : 'gray.300'}
        borderWidth={isDragActive ? 2 : 1}
        cursor="pointer"
        textAlign="center"
        w="100%"
      >
        <input {...getInputProps()} />
        <Text>{isDragActive ? 'Drop the images here ...' : 'Drag and drop images, or click to select files'}</Text>
        <Button colorScheme="blue" variant="outline" mt={2}>
          Upload Images
        </Button>
      </Box>
      <VStack spacing={4} align="stretch">
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {renderImages(images, existingImages.length)}
        </Box>
      </VStack>
    </VStack>
  );
};

export default ImageUpload;
