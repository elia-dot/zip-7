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
  IconButton,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import he from 'date-fns/locale/he';

const CompaniesControls = () => {
  const [startDate, setStartDate] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { error, loading, reportTypes, machines } = useSelector(
    state => state.reports
  );
  const { companies } = useSelector(state => state.companies);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [report, setReport] = useState({
    review: '',
    company: '',
    machine: {},
    machineDescription: '',
    machineLicenseNumber: '',
    location: '',
    reportNumber: '',
    reportType: '',
    notes: [''],
    actions: [''],
    conclusions: [''],
  });
  console.log(report);

  registerLocale('he', he);

  const reportTypesOptions = reportTypes.map(type => ({
    value: type._id,
    label: type.type,
  }));

  const companiesOptions = companies.map(company => ({
    value: company._id,
    label: company.name,
  }));

  const machinesOptions = machines.map(machine => {
    const machineText = `${machine.model}, ${machine.serialNumber}, ${machine.manufacturer}, ${machine.year}`;
    return {
      value: machineText,
      label: machineText,
    };
  });

  const handleReportChange = e => {
    const { target } = e;
    setReport({ ...report, [target.name]: target.value });
  };

  const noteChange = (e, i) => {
    const { target } = e;
    const newNotes = [...report.notes];
    newNotes[i] = target.value;
    setReport({ ...report, notes: newNotes });
  };

  const actionChange = (e, i) => {
    const { target } = e;
    const newActions = [...report.actions];
    newActions[i] = target.value;
    setReport({ ...report, actions: newActions });
  };

  const conclusionChange = (e, i) => {
    const { target } = e;
    const newConclusions = [...report.conclusions];
    newConclusions[i] = target.value;
    setReport({ ...report, conclusions: newConclusions });
  };

  const removeNote = i => {
    const newNotes = [...report.notes];
    if (i === report.notes.length - 1) {
      newNotes[i] = '';
    } else {
      newNotes.splice(i, 1);
    }

    setReport({ ...report, notes: newNotes });
  };

  const removeAction = i => {
    const newActions = [...report.actions];
    if (i === report.actions.length - 1) {
      newActions[i] = '';
    } else {
      newActions.splice(i, 1);
    }

    setReport({ ...report, actions: newActions });
  };

  const removeConclusion = i => {
    const newConclusions = [...report.conclusions];
    if (i === report.conclusions.length - 1) {
      newConclusions[i] = '';
    } else {
      newConclusions.splice(i, 1);
    }

    setReport({ ...report, conclusions: newConclusions });
  };

  const addInputNote = () => {
    const newNotes = [...report.notes];
    newNotes.push('');
    setReport({ ...report, notes: newNotes });
  };

  const addInputAction = () => {
    const newActions = [...report.actions];
    newActions.push('');
    setReport({ ...report, actions: newActions });
  };

  const addInputConclusion = () => {
    const newConclusions = [...report.conclusions];
    newConclusions.push('');
    setReport({ ...report, conclusions: newConclusions });
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
                  options={machinesOptions}
                  onChange={({ value }) => {
                    setReport({ ...report, machine: value });
                  }}
                  placeholder="בחר כלי"
                />
              </Box>
            </Flex>
            <Flex gap="8px" mb="12px">
              <Input
                placeholder="תיאור הכלי"
                name="machineDescription"
                value={report.machineDescription}
                onChange={handleReportChange}
                required
              />
              <Input
                placeholder="מס' רישוי"
                name="machineLicenseNumber"
                value={report.machineLicenseNumber}
                onChange={handleReportChange}
                required
              />
            </Flex>
            <Flex gap="8px" mb="12px">
              <Input
                placeholder="איזור"
                name="location"
                value={report.location}
                onChange={handleReportChange}
                required
              />
              <Input
                placeholder="מס' תסקיר"
                name="reportNumber"
                value={report.reportNumber}
                onChange={handleReportChange}
                required
              />
            </Flex>
            <Flex gap="8px" mb="12px">
              <Input
                placeholder="סוג הבדיקה"
                name="reportType"
                value={report.reportType}
                onChange={handleReportChange}
                required
                flex={2}
              />
              <Box flex={3}>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  className="date-picker"
                  placeholderText="תאריך בדיקה הבאה"
                  dateFormat="dd/MM/yyyy"
                  isClearable={startDate}
                  clearButtonClassName="clear-date"
                  locale="he"
                />
                <Text display="flex" fontSize="13px" gap="8px">
                  *ברירת מחדל:
                  <Moment
                    date={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1)
                      )
                    }
                    format="DD/MM/YYYY"
                  />
                </Text>
              </Box>
            </Flex>
            <Text>הערות:</Text>
            {Array(report.notes.length)
              .fill(0)
              .map((_, index) => (
                <Flex key={index} gap="8px">
                  <InputGroup>
                    <Input
                      value={report.notes[index]}
                      onChange={e => noteChange(e, index)}
                    />
                    {report.notes[index] !== '' && (
                      <InputRightElement
                        children={<IoMdClose />}
                        cursor="pointer"
                        onClick={() => removeNote(index)}
                      />
                    )}
                  </InputGroup>
                  {index === report.notes.length - 1 && (
                    <IconButton
                      icon={<IoMdAdd />}
                      onClick={addInputNote}
                      disabled={report.notes[index] === ''}
                    />
                  )}
                </Flex>
              ))}
            <Text>פעולות לביצוע:</Text>
            {Array(report.actions.length)
              .fill(0)
              .map((_, index) => (
                <Flex key={index} gap="8px">
                  <InputGroup>
                    <Input
                      value={report.actions[index]}
                      onChange={e => actionChange(e, index)}
                    />
                    {report.actions[index] !== '' && (
                      <InputRightElement
                        children={<IoMdClose />}
                        cursor="pointer"
                        onClick={() => removeAction(index)}
                      />
                    )}
                  </InputGroup>
                  {index === report.actions.length - 1 && (
                    <IconButton
                      icon={<IoMdAdd />}
                      onClick={addInputAction}
                      disabled={report.actions[index] === ''}
                    />
                  )}
                </Flex>
              ))}
            <Text>מסקנות:</Text>
            {Array(report.conclusions.length)
              .fill(0)
              .map((_, index) => (
                <Flex key={index} gap="8px">
                  <InputGroup>
                    <Input
                      value={report.conclusions[index]}
                      onChange={e => conclusionChange(e, index)}
                    />
                    {report.conclusions[index] !== '' && (
                      <InputRightElement
                        children={<IoMdClose />}
                        cursor="pointer"
                        onClick={() => removeConclusion(index)}
                      />
                    )}
                  </InputGroup>
                  {index === report.conclusions.length - 1 && (
                    <IconButton
                      icon={<IoMdAdd />}
                      onClick={addInputConclusion}
                      disabled={report.conclusions[index] === ''}
                    />
                  )}
                </Flex>
              ))}
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
