import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { BiUserCircle } from 'react-icons/bi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import {FaUsers} from 'react-icons/fa'
import {MdNotificationsActive} from 'react-icons/md'

const SideNav = () => {
  const { user } = useSelector(state => state.auth);
  console.log(user);
  return (
    <Box bg="blue.800" height="100%" borderRadius="10px" padding="24px">
      <Flex alignItems="center" gap="12px">
        <Icon as={BiUserCircle} color="white" w={8} h={8} />
        <Text
          color="white"
          fontSize="22px"
        >{`${user.firstName} ${user.lastName}`}</Text>
      </Flex>
      <Divider my="10px" />
      <Flex alignItems="center" gap="12px">
        <Icon as={HiOutlineDocumentReport} color="white" w={8} h={8} />
        <Text color="white" fontSize="22px">
          סקירות
        </Text>
      </Flex>
      {user.role === 'master' && (
        <Flex alignItems="center" gap="12px">
          <Icon as={FaUsers} color="white" w={8} h={8} />
          <Text color="white" fontSize="22px">
            לקוחות
          </Text>
        </Flex>
      )}
       <Flex alignItems="center" gap="12px">
          <Icon as={MdNotificationsActive} color="white" w={8} h={8} />
          <Text color="white" fontSize="22px">
            תזכורות
          </Text>
        </Flex>
    </Box>
  );
};

export default SideNav;
