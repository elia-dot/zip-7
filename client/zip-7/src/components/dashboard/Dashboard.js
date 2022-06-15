import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import SideNav from '../SideNav';

const Dashboard = () => {
 
  return  (
    <Flex padding="8px">
      <Box height="100vh">
        <SideNav />
      </Box>
      <Button onClick={() => {}}>Log Out</Button>
    </Flex>
  );
};

export default Dashboard;
