import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LinkItemProps } from './LinkItems';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  to: string;
}

const NavItem = ({ icon, children, to, ...rest }: NavItemProps & LinkItemProps) => {
  return (
    <Link as={RouterLink} to={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.200',
          color: 'gray.900',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'gray.900',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
