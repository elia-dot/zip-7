import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Input,
  InputGroup,
  Show,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';

import ReportForm from './ReportForm';

const ReportsControls = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchChange = e => {};
  
  return (
    <Box display="flex" alignItems="flex-end" height="100%" px="3%" pb="15px">
      <ReportForm isOpen={isOpen} onClose = {onClose}/>
      <Button
        bg="blue.600"
        color="white"
        _hover={{ bg: 'blue.500' }}
        onClick={onOpen}
      >
        {' '}
        <Flex alignItems="center" gap="12px">
          <Icon as={IoMdAdd} color="white" />
          <Show above="md">
            {' '}
            <Text>תסקיר חדש</Text>
          </Show>
        </Flex>
      </Button>
      <Button bg="none" onClick={() => setShowSearchInput(true)} pr="0px">
        <Icon as={BiSearchAlt} />
      </Button>
      <InputGroup width="200px">
        <Input
          ml="8px"
          bg="white"
          width={showSearchInput ? '200px' : '0px'}
          p={showSearchInput ? '8px' : '0px'}
          transition="all 0.3s ease-in-out"
          onChange={handleSearchChange}
        />
        <InputRightElement
          children={
            showSearchInput ? (
              <Icon as={IoMdClose} onClick={() => setShowSearchInput(false)} />
            ) : null
          }
        />
      </InputGroup>
    </Box>
  );
};

export default ReportsControls;
