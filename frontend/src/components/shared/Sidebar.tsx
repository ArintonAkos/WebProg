import React from 'react';
import {
  Box,
  VStack,
  Text,
  Link,
  useDisclosure,
  useMediaQuery,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const content = (
    <VStack spacing={4} alignItems="start">
      <Text fontSize="xl" mb={3}>
        Dashboard
      </Text>
      <Link as={RouterLink} to="/add-restaurant">
        Add Restaurant
      </Link>
      <Link as={RouterLink} to="/upload-images">
        Upload Images
      </Link>
      <Link as={RouterLink} to="/reservation">
        Make a Reservation
      </Link>
      <Link as={RouterLink} to="/">
        Home
      </Link>
    </VStack>
  );

  if (!isLargerThan768) {
    return (
      <>
        <Box as="button" onClick={onOpen} position="fixed" bottom="4" right="4" zIndex="overlay">
          Open Sidebar
        </Box>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <Box p="4">{content}</Box>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  }

  return (
    <Box width="20%" backgroundColor="gray.800" p={4}>
      {content}
    </Box>
  );
};

export default Sidebar;
