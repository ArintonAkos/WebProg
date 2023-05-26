import { Flex, FlexProps, Icon, Link, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { LinkItemProps } from './LinkItems';
import { FiChevronDown, FiChevronUp } from 'react-icons/all';
import SubItem from './SubItem';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  to: string;
  subItems?: Array<LinkItemProps>;
  onClose: () => void;
  bgColor?: string;
}

const NavItem = ({ icon, children, to, subItems, onClose, bgColor, ...rest }: NavItemProps & LinkItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  console.log(location.pathname, to);

  const fallbackBg = useColorModeValue('gray.100', 'gray.900');
  const hoverBg = useColorModeValue('gray.200', 'blue.700');
  const bg = isActive ? hoverBg : bgColor ?? fallbackBg;
  const color = useColorModeValue('gray.900', 'white');

  return (
    <>
      <Link as={RouterLink} to={to} onClick={onClose} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={bg}
          color={color}
          _hover={{ bg: hoverBg }}
          {...rest}
        >
          {icon && <Icon mr="4" fontSize="16" _groupHover={{ color: 'white' }} as={icon} />}
          {children}
        </Flex>
      </Link>
      {subItems?.map((subItem) => (
        <SubItem
          key={subItem.name}
          icon={subItem.icon}
          name={subItem.name}
          to={subItem.to}
          onClose={onClose}
          bgColor={bgColor}
        />
      ))}
    </>
  );
};

export default NavItem;
