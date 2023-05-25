import { Flex, FlexProps, IconButton, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const user = useSelector((state: RootState) => state.auth.userData.user);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
      <Link as={RouterLink} to="/home">
        <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
      </Link>
      {user && (
        <Text fontSize="xl" ml="8" fontFamily="monospace">
          Hi, {user.name}
        </Text>
      )}
    </Flex>
  );
};

export default MobileNav;
