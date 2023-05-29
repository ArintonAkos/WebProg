import { Flex, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { LinkItemProps } from './LinkItems';

interface SubItemProps extends LinkItemProps {
  onClose: () => void;
  bgColor?: string;
}

const SubItem = ({ icon, name, to, onClose, bgColor, ...rest }: SubItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const fallbackBg = useColorModeValue('gray.100', 'gray.900');
  const hoverBg = useColorModeValue('blue.200', 'gray.700');
  const bg = isActive ? hoverBg : bgColor ?? fallbackBg;
  const color = useColorModeValue('black', 'white');

  return (
    <Link as={RouterLink} to={to} onClick={onClose} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="6"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={bg}
        color={color}
        _hover={{ bg: hoverBg }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" _groupHover={{ color: 'white' }} as={icon} />}
        {name}
      </Flex>
    </Link>
  );
};

export default SubItem;
