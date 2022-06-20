import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const CompaniesControls = () => {
  return (
    <Box display="flex" alignItems="flex-end" height="100%" px="3%" pb="15px">
      <Button bg="blue.600" color="white" _hover= {{bg: "blue.500"}}>
        {' '}
        <Flex alignItems="center" gap="12px">
          <Icon as={IoMdAdd} color="white" />
          <Text>הוספת לקוח</Text>
        </Flex>
      </Button>
    </Box>
  );
};

export default CompaniesControls;
