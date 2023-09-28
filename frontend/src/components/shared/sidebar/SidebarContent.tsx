import { Box, BoxProps, CloseButton, Flex, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Group, LinkItems } from './LinkItems';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import NavItem from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ onClose, ...rest }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.auth.userData.user);

  const filteredLinkItems = LinkItems.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => item.authRequired === undefined || (user && item.authRequired) || (!user && !item.authRequired),
    ),
  }));

  const linkItems = filteredLinkItems.filter((group) => group.items.length > 0);

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
        {linkItems.map((item: Group) => (
          <React.Fragment key={item.name}>
            <Text fontWeight="bold" color={color} pl={4} fontSize="l">
              {item.name}
            </Text>
            {item.items.map((navItem) => (
              <NavItem
                icon={navItem.icon}
                to={navItem.to}
                name={navItem.name}
                onClose={onClose}
                color={color}
                bgColor={itemBgColor}
                key={navItem.name}
                subItems={navItem.subItems}
              >
                {navItem.name}
              </NavItem>
            ))}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};

export default SidebarContent;
