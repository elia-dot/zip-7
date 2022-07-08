import React, { useState, useEffect } from 'react';

import {
  Flex,
  Text,
  Divider,
  Box,
  List,
  ListItem,
  Button,
  Link,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import ReportTable from './ReportTable';
import ReportForm from './ReportForm';
import { useRoute } from '../../../hooks/useRoute';

const ReportDetails = ({ match }) => {
  const [report, setReport] = useState(null);
  const [repoerModalType, setReportModalType] = useState('');
  const closeReportForm = () => setReportModalType('');
  const route = useRoute();
  const { reports } = useSelector(state => state.reports);
  const { user } = useSelector(state => state.auth);
  useEffect(() => {
    const id = match.params.id;
    const report = reports.find(e => e._id === id);
    setReport(report);
  }, [match.params.id]);
  if (!report) return null;
  return (
    <Box padding="1em 2em">
      {repoerModalType !== '' && (
        <ReportForm
          isOpen={true}
          onClose={closeReportForm}
          modalType={repoerModalType}
          oldReport={report}
        />
      )}
      <Flex wrap="wrap" gap="36px" fontSize="14px">
        {route !== 'clients' && (
          <>
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
          </>
        )}
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
      <Divider />
      <Text fontWeight="bold" mt="24px">
        פרטי התסקיר:
      </Text>
      <ReportTable report={report} />
      <Divider />
      <Flex wrap="wrap" gap="36px" mt="24px">
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
        <Link as={RouterLink} isExternal to={`/report/PDF/${report._id}`}>
          <Button bg="blue.600" color="white" textDecoration="none">
            יצא PDF
          </Button>
        </Link>
        {user.role === 'master' && (
          <>
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
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ReportDetails;
