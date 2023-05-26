import { Box, Stack, useColorModeValue, Text, BoxProps, CloseButton, Link, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import NavItem from './NavItem';
import { LinkItemProps, LinkItems, UnAuthLinkItems } from './LinkItems';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import React from 'react';
import SubItem from './SubItem';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ onClose, ...rest }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.auth.userData.user);

  let linkItems: LinkItemProps[] = user ? [] : UnAuthLinkItems;

  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('gray.900', 'white');
  const itemBgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(128, 128, 128, 0.025)');

  return (
    <Box
      bg={bg}
      color={color}
      p={2}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Stack spacing={6}>
        <Flex alignItems="center" mt={6} mx={8} justifyContent="space-between">
          <Link as={RouterLink} to="/home">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Dashboard
            </Text>
          </Link>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link: LinkItemProps) => {
          if (link.group) {
            return (
              <React.Fragment key={link.group}>
                <Text fontWeight="bold" color={color} pl={4} fontSize="l">
                  {link.group}
                </Text>
                <NavItem
                  icon={link.icon}
                  to={link.to}
                  name={link.name}
                  onClose={onClose}
                  color={color}
                  bgColor={itemBgColor}
                  subItems={link.subItems}
                >
                  {link.name}
                </NavItem>
              </React.Fragment>
            );
          } else {
            return (
              <NavItem
                key={link.name}
                icon={link.icon}
                to={link.to}
                name={link.name}
                onClose={onClose}
                color={color}
                bgColor={itemBgColor}
              >
                {link.name}
              </NavItem>
            );
          }
        })}
      </Stack>
      {user && (
        <Stack spacing={6} mt={8}>
          <Text fontWeight="bold" color={color} ml={4}>
            User
          </Text>
          <NavItem
            icon={IoIosLogOut}
            to="/auth/logout"
            name="Logout"
            onClose={onClose}
            color={color}
            bgColor={itemBgColor}
          >
            Logout
          </NavItem>
        </Stack>
      )}
      {!user && (
        <Stack spacing={6} mt={8}>
          <Text fontWeight="bold" color={color} ml={4}>
            User
          </Text>
          <NavItem
            icon={IoIosLogIn}
            to="/auth/login"
            name="Login"
            onClose={onClose}
            color={color}
            bgColor={itemBgColor}
          >
            Login
          </NavItem>
        </Stack>
      )}
    </Box>
  );
};

export default SidebarContent;
