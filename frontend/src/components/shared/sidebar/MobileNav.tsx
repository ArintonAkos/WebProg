import { Flex, FlexProps, IconButton, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const bg = useColorModeValue('white', 'gray.900');
  const borderBottomColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={bg}
      borderBottomWidth="1px"
      borderBottomColor={borderBottomColor}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />
      <Link as={RouterLink} to="/home">
        <Text fontSize="2xl" ml="4" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
      </Link>
    </Flex>
  );
};

export default MobileNav;
