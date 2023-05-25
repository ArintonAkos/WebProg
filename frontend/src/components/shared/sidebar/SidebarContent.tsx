import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import NavItem from './NavItem';
import { LinkItemProps, LinkItems, LinkItemGroup, UnAuthLinkItems, AuthLinkItems } from './LinkItems';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

type GroupedLinkItems = { [group in LinkItemGroup]: LinkItemProps[] };

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.auth.userData.user);
  let mergedItems: LinkItemProps[] = [];

  if (user) {
    mergedItems = [...LinkItems, ...AuthLinkItems];
  } else {
    mergedItems = [...LinkItems, ...UnAuthLinkItems];
  }

  console.log(user?.permissions);
  const filteredLinkItems = mergedItems.filter(
    (item) => !item.requiredPermission || (user && user?.permissions?.some((p) => p.name === item.requiredPermission)),
  );

  console.log(filteredLinkItems, mergedItems);

  const groupedLinkItems: GroupedLinkItems = filteredLinkItems.reduce((groups, item) => {
    const { group } = item;

    if (!group) {
      groups['default'] = groups['default'] || [];
      groups['default'].push(item);
    } else {
      groups[group] = groups[group] || [];
      groups[group].push(item);
    }

    return groups;
  }, {} as GroupedLinkItems);

  console.log(groupedLinkItems);

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
      <Flex alignItems="center" mt={6} mx={8} justifyContent="space-between">
        <Link as={RouterLink} to="/home">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Dashboard
          </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {user && (
        <Text fontSize="l" ml="8" my={4}>
          Hi, <b>{user.name}</b>
        </Text>
      )}
      {Object.entries(groupedLinkItems).map(([group, items]) => (
        <Accordion key={group} allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {group || 'Default'}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} display={isExpanded ? 'block' : 'none'}>
                  {items.map((link: LinkItemProps) => (
                    <NavItem key={link.name} icon={link.icon} to={link.to} name={link.name}>
                      {link.name}
                    </NavItem>
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

export default SidebarContent;
