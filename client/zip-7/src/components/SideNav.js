import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { BiUserCircle } from 'react-icons/bi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { FiActivity, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

const SideNav = ({setShow}) => {
  const { user } = useSelector(state => state.auth);

  return (
    <Flex bg="blue.600" height="100%" borderRadius="10px" direction="column">
      <Box px="48px" pb="16px" pt="32px">
        <Flex alignItems="center" gap="12px" justifyContent="center">
          <Icon as={BiUserCircle} color="white" w={8} h={8} />
          <Text
            color="white"
            fontSize="22px"
          >{`${user.firstName} ${user.lastName}`}</Text>
        </Flex>
      </Box>
      <Divider />
      <Link
        as={NavLink}
        to="/dashboard/reports"
        _activeLink={{ background: '#000' }}
        _hover={{ bg: 'blue.700' }}
        py="18px"
        cursor="pointer"
        transition="all 0.2s"
        onClick={() => {setShow(false)}}
      >
        <Flex alignItems="center" gap="12px" justifyContent="center">
          <Icon as={HiOutlineDocumentReport} color="white" w={8} h={8} />
          <Text color="white" fontSize="18px">
            סקירות
          </Text>
        </Flex>
      </Link>
      {user.role === 'master' && (
        <Link
          as={NavLink}
          to="/dashboard/clients"
          _activeLink={{ background: '#000' }}
          _hover={{ bg: 'blue.700' }}
          py="18px"
          cursor="pointer"
          transition="all 0.2s"
          onClick={() => {setShow(false)}}
        >
          <Flex alignItems="center" gap="12px" justifyContent="center">
            <Icon as={FaUsers} color="white" w={8} h={8} />
            <Text color="white" fontSize="18px">
              לקוחות
            </Text>
          </Flex>
        </Link>
      )}
      <Link
        as={NavLink}
        to="/dashboard/reminders"
        _activeLink={{ background: '#000' }}
        _hover={{ bg: 'blue.700' }}
        py="18px"
        cursor="pointer"
        transition="all 0.2s"
        onClick={() => {setShow(false)}}
      >
        <Flex alignItems="center" gap="12px" justifyContent="center">
          <Icon as={MdNotificationsActive} color="white" w={8} h={8} />
          <Text color="white" fontSize="18px">
            תזכורות
          </Text>
        </Flex>
      </Link>
      {user.role === 'master' && (
        <Link
          as={NavLink}
          to="/dashboard/logs"
          _activeLink={{ background: '#000' }}
          _hover={{ bg: 'blue.700' }}
          py="18px"
          cursor="pointer"
          transition="all 0.2s"
          onClick={() => {setShow(false)}}
        >
          <Flex alignItems="center" gap="12px" justifyContent="center">
            <Icon as={FiActivity} color="white" w={8} h={8} />
            <Text color="white" fontSize="18px">
              פעילות
            </Text>
          </Flex>
        </Link>
      )}
      <Box py="16px" cursor="pointer" transition="all 0.2s" mt="auto">
        <Flex alignItems="center" gap="12px" justifyContent="center">
          <Flex
            alignItems="center"
            gap="12px"
            justifyContent="center"
            bg="#000"
            py="12px"
            px="22px"
            borderRadius="10px"
            shadow={`0px 0px 10px rgba(0, 0, 0, 0.5)`}
            _hover= {{shadow: `0px 0px 10px rgba(0, 0, 0, 1)`}}
          >
            <Icon as={FiLogOut} color="white" w={8} h={8} />
            <Text color="white" fontSize="18px">
              התנתק
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SideNav;
