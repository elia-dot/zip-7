import { Box, Flex, Grid, Show, Spinner, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import { getUsers } from '../../redux/actions/users';
import User from './User';

const Users = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  if (loading && users.length === 0)
    return (
      <Grid placeContent="center" height="80vh">
        <Spinner
          width="30px"
          height="30px"
          color="blue.600"
          size="xl"
          thickness="4px"
          speed="0.65s"
        />
        <Text textAlign="center">טוען משתמשים...</Text>
      </Grid>
    );
  return (
    <>
      <Flex padding="16px" borderBottom="1px solid gray">
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">שם</Text>
        </Box>

        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">תפקיד</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">טלפון</Text>
        </Box>
        <Box flex={1}></Box>
      </Flex>
      <Box>
        {users.map(user => (<User key={user._id} user = {user}/>))}
      </Box>
    </>
  );
};

export default Users;
