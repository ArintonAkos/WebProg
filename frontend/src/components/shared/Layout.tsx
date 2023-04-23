import React from 'react';
import { Box, Flex, Link, useMediaQuery } from '@chakra-ui/react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  let contentWidth = '100%';

  if (isLargerThan768) {
    contentWidth = '80%';
  }

  return (
    <Flex height="100vh">
      <Sidebar />
      <Box width={contentWidth}>
        <Box p={4}>{children}</Box>
      </Box>
    </Flex>
  );
};

export default Layout;
