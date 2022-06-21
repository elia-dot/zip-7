import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Alert,
  AlertDescription,
  Spinner,
  InputGroup,
  Show,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const CompaniesControls = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { error, loading, reportTypes } = useSelector(state => state.reports);
  const { companies } = useSelector(state => state.companies);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [report, setReport] = useState({
    review: '',
    company: '',
  });
  console.log(report);

  const reportTypesOptions = reportTypes.map(type => ({
    value: type._id,
    label: type.type,
  }));

  const companiesOptions = companies.map(company => ({
    value: company._id,
    label: company.name,
  }));

  const handleReportChange = e => {
    const { target } = e;
    setReport({ ...report, [target.name]: target.value });
  };

  const handleSearchChange = e => {};

  const add = () => {};

  useEffect(() => {}, [error]);

  return (
    <Box display="flex" alignItems="flex-end" height="100%" px="3%" pb="15px">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>סקירה חדשה</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="8px" mb="12px" alignItems="center">
              <Text>סוג הסקירה:</Text>
              <Box flex={1}>
                <Select
                  options={reportTypesOptions}
                  onChange={({ value }) => {
                    setReport({ ...report, review: value });
                  }}
                  placeholder="בחר סוג תסקיר"
                />
              </Box>
            </Flex>
            <Flex gap="8px" mb="12px" alignItems="center">
              <Text>חברה:</Text>
              <Box flex={1}>
                <Select
                  options={companiesOptions}
                  onChange={({ value }) => {
                    setReport({ ...report, company: value });
                  }}
                  placeholder="בחר חברה"
                />
              </Box>
            </Flex>
            <Flex gap="8px" mb="12px" alignItems="center">
              <Text>כלי:</Text>
              <Box flex={1}>
                <Select
                  options={companiesOptions}
                  onChange={({ value }) => {
                    setReport({ ...report, company: value });
                  }}
                  placeholder="בחר כלי"
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={add}
              display="flex"
              alignItems="center"
              gap="8px"
            >
              <Text>שמור</Text>
              {loading && <Spinner size="sm" />}
            </Button>
            <Button variant="outline" onClick={onClose}>
              ביטול
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            <Text>סקירה חדשה</Text>
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

export default CompaniesControls;
