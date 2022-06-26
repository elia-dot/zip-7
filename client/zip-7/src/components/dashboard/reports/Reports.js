import React, { useEffect } from 'react';
import { Box, Text, Show, Flex, Accordion, Grid, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getReports,
  getReportsTypes,
  getMachines,
} from '../../../redux/actions/reports';
import { getCompanies } from '../../../redux/actions/companies';
import Report from './Report';

const Reports = () => {
  const dispatch = useDispatch();
  const { loading, reports } = useSelector(state => state.reports);
  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getReportsTypes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getMachines());
  }, [dispatch]);

  if (loading && reports.length === 0)
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
        <Text>טוען מידע...</Text>
      </Grid>
    );
  return (
    <Flex direction="column">
      <Flex padding="16px" borderBottom="1px solid gray">
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center"> חברה:</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">סוג תסקיר:</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center"> תאריך ביצוע הסקירה:</Text>
        </Box>
        {
          <Show breakpoint="(min-width: 992px)">
            {' '}
            <Box flex={3} borderRight="1px solid lightgray">
              <Text textAlign="center">מבצע הסקירה:</Text>
            </Box>
          </Show>
        }
        <Box flex={1}></Box>
      </Flex>
      <Accordion allowToggle>
        {reports.map(report => (
          <Report key={report._id} report={report} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default Reports;
