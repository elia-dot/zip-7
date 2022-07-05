import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const User = ({ user }) => {
  const history = useHistory();
  return (
    <Flex padding="8px 16px">
      <Box flex={3}>
        <Text textAlign="center">{`${user.firstName} ${user.lastName}`}</Text>
      </Box>

      <Box flex={3}>
        <Text textAlign="center">
          {user.role === 'client' || user.role === 'contact'
            ? 'לקוח'
            : user.role === 'master'
            ? 'מנהל'
            : user.role === 'user'
            ? 'משתמש'
            : null}
        </Text>
      </Box>
      <Box flex={3}>
        <Text textAlign="center">{user.phone}</Text>
      </Box>
      <Box flex={1} textAlign="center">
        <Icon
          as={FiArrowLeftCircle}
          cursor="pointer"
          _hover={{ fontSize: '18px' }}
          transition="all 0.2s ease-in-out"
          onClick={() => history.push(`/dashboard/users/${user._id}`)}
        />
      </Box>
    </Flex>
  );
};

export default User;
