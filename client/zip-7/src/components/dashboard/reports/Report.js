import React, { useState } from 'react';

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Show,
  Box,
  Text,
  Flex,
  List,
  ListItem,
  Button,
  Divider,
} from '@chakra-ui/react';

import Moment from 'react-moment';
import ReportTable from './ReportTable';
import ReportForm from './ReportForm';

const Report = ({ report }) => {
  const [repoerModalType, setReportModalType] = useState('');
  const closeReportForm = () => setReportModalType('');
  return (
    <AccordionItem>
      {repoerModalType !== '' && (
        <ReportForm
          isOpen={true}
          onClose={closeReportForm}
          modalType={repoerModalType}
          oldReport={report}
        />
      )}
      <AccordionButton _expanded={{ bg: 'gray.100' }}>
        <Flex py="16px" w="100%">
          <Box flex={3}>
            <Text textAlign="center" fontWeight="bold">
              {' '}
              {report.company.name}
            </Text>
          </Box>
          <Show breakpoint="(min-width: 992px)">
            <Box flex={3}>
              <Text textAlign="center"> {report.review.type}</Text>
            </Box>
          </Show>
          <Box flex={3}>
            <Text textAlign="center">
              {' '}
              <Moment data={report.date} format="DD/MM/YYYY" />
            </Text>
          </Box>

          <Box flex={3}>
            <Text textAlign="center">{`${report.reviewer.firstName} ${report.reviewer.lastName}`}</Text>
          </Box>

          <Box flex={1}>
            <AccordionIcon />
          </Box>
        </Flex>
      </AccordionButton>
      <AccordionPanel p="1em 2em">
        <Flex wrap="wrap" gap="36px" fontSize="14px">
          <Flex gap="12px">
            <Text fontWeight="bold">חברה:</Text>
            <Text>{report.company.name}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">איש קשר ראשי:</Text>
            <Text>{`${report.company.primaryContact.firstName} ${report.company.primaryContact.firstName}`}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">טלפון:</Text>
            <Text>{report.company.primaryContact.phone}</Text>
          </Flex>
          <Flex gap="12px">
            <Text fontWeight="bold">תסקיר מס':</Text>
            <Text>{report.reportNumber}</Text>
          </Flex>
        </Flex>
        <Flex wrap="wrap" gap="36px">
          <Flex direction="column" mt="24px">
            <Flex gap="12px">
              <Text fontWeight="bold">סוג מכונת הרמה:</Text>
              <Text>{report.review.machineType}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">תיאור:</Text>
              <Text>{report.machineDescription}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">מס' רישוי:</Text>
              <Text>{report.machineLicenseNumber}</Text>
            </Flex>
            {typeof report.machine === 'string' && (
              <Flex gap="12px">
                <Text fontWeight="bold">מס' מזהה:</Text>
                <Text>{report.machine}</Text>
              </Flex>
            )}
            {typeof report.machine === 'object' && (
              <>
                <Flex gap="12px">
                  <Text fontWeight="bold">מס' מזהה:</Text>
                  <Text>{report.machine.serialNumber}</Text>
                </Flex>
                <Flex gap="12px">
                  <Text fontWeight="bold">דגם:</Text>
                  <Text>{report.machine.model}</Text>
                </Flex>
                <Flex gap="12px">
                  <Text fontWeight="bold">יצרן:</Text>
                  <Text>{report.machine.manufacturer}</Text>
                </Flex>
                <Flex gap="12px">
                  <Text fontWeight="bold">שנת ייצור:</Text>
                  <Text>{report.machine.year}</Text>
                </Flex>
              </>
            )}
          </Flex>
          <Flex direction="column" mt="24px">
            <Flex gap="12px">
              <Text fontWeight="bold">סוג בדיקה:</Text>
              <Text>{report.reportType}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">מיקום הבדיקה:</Text>
              <Text>{report.location}</Text>
            </Flex>
            <Flex gap="12px">
              <Text fontWeight="bold">סקירה הבאה:</Text>
              <Moment date={report.nextReport} format="DD/MM/YYYY" />
            </Flex>
          </Flex>
        </Flex>
        <Divider bg="blue.600" />
        <Text fontWeight="bold">פרטי התסקיר:</Text>
        <ReportTable report={report} />
        <Divider />
        <Flex wrap="wrap" gap="36px">
          <Box>
            <Text fontWeight="bold">הערות:</Text>
            {report.notes[0] === '' ? (
              <Text>אין</Text>
            ) : (
              <List>
                {report.notes.map((note, i) => (
                  <ListItem key={i}>{note}</ListItem>
                ))}
              </List>
            )}
          </Box>
          <Box>
            <Text fontWeight="bold">פעולות לביצוע:</Text>
            {report.actions[0] === '' ? (
              <Text>אין</Text>
            ) : (
              <List>
                {report.notes.map((note, i) => (
                  <ListItem key={i}>{note}</ListItem>
                ))}
              </List>
            )}
          </Box>
          <Box>
            <Text fontWeight="bold">מסקנות:</Text>
            {report.conclusions[0] === '' ? (
              <Text>תקין במועד הבדיקה</Text>
            ) : (
              <List>
                {report.notes.map((note, i) => (
                  <ListItem key={i}>{note}</ListItem>
                ))}
              </List>
            )}
          </Box>
        </Flex>
        <Flex wrap="wrap" gap="36px" mt="24px">
          <Button
            bg="blue.600"
            color="white"
            onClick={() => setReportModalType('edit')}
          >
            ערוך תסקיר
          </Button>
          <Button
            bg="blue.600"
            color="white"
            onClick={() => setReportModalType('duplicate')}
          >
            שכפל תסקיר
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Report;
