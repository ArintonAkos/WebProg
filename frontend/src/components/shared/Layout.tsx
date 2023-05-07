import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex height="100vh">
      <Sidebar>
        <Box width="100%" p={4}>
          {children}
        </Box>
      </Sidebar>
    </Flex>
  );
};

export default Layout;
