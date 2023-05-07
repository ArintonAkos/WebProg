import { Box, BoxProps, CloseButton, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import NavItem from './NavItem';
import { LinkItemProps, LinkItems } from './LinkItems';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link as={RouterLink} to="/home">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Dashboard
          </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link: LinkItemProps) => (
        <NavItem key={link.name} icon={link.icon} to={link.to} name={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
