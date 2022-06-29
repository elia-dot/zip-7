import React, { useState, useEffect } from 'react';
import { Box, Divider, Flex, Icon, Link, Select, Show } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

const NextRportsTab = () => {
  const [sortedReports, setSortedReports] = useState([]);
  const [displayedReports, setDisplayedReports] = useState('week');
  const { reports } = useSelector(state => state.reports);

  useEffect(() => {
    let sortedReports = reports
      .sort((a, b) => {
        return new Date(a.nextReport) - new Date(b.nextReport);
      })
      .filter(e => new Date(e.nextReport) > new Date());
    if (displayedReports === 'week') {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      sortedReports = sortedReports.filter(
        e =>
          new Date(e.nextReport) > new Date() &&
          new Date(e.nextReport) < nextWeek
      );
      setSortedReports(sortedReports);
    }

    if (displayedReports === 'month') {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      sortedReports = sortedReports.filter(
        e =>
          new Date(e.nextReport) > new Date() &&
          new Date(e.nextReport) < nextMonth
      );
      setSortedReports(sortedReports);
    }

    if (displayedReports === 'year') {
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      sortedReports = sortedReports.filter(
        e =>
          new Date(e.nextReport) > new Date() &&
          new Date(e.nextReport) < nextYear
      );
      setSortedReports(sortedReports);
    }
  }, [reports, displayedReports]);
  return (
    <>
      <Flex gap="12px" alignItems="center">
        הראה תסקירים
        <Select
          width="200px"
          value={displayedReports}
          onChange={e => {
            setDisplayedReports(e.target.value);
          }}
        >
          <option value="week">מהשבוע הקרוב</option>
          <option value="month">מהחודש הקרוב</option>
          <option value="year">מהשנה הקרובה</option>
        </Select>
      </Flex>
      <Flex textAlign="center" padding="0.5em 1em">
        <Box flex={1}>חברה</Box>
        <Show above="md">
          <Box flex={2}>תסקיר</Box>
        </Show>
        <Box flex={1}>תאריך</Box>
        <Box flex={1}></Box>
      </Flex>
      <Box
        boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
        padding="0.5em 1em"
        borderRadius="5px"
      >
        {sortedReports.map((e, i) => (
          <>
            <Flex key={i} textAlign="center" py="12px">
              <Link
                as={RouterLink}
                to={`/dashboard/clients/${e.company._id}`}
                flex={1}
                color="blue.600"
              >
                {e.company.name}
              </Link>
              <Show above="md">
                <Box flex={2}>{e.review.type}</Box>
              </Show>
              <Box flex={1}>
                <Moment date={e.nextReport} format="DD/MM/YYYY" />
              </Box>
              <Show above="md">
                <Link
                  as={RouterLink}
                  to={`/dashboard/reports/${e._id}`}
                  flex={1}
                  color="blue.600"
                >
                  ראה תסקיר אחרון
                </Link>
              </Show>
              <Show below="md">
                <Link
                  as={RouterLink}
                  to={`/dashboard/reports/${e._id}`}
                  flex={1}
                >
                  <Icon as={FiArrowLeftCircle} />
                </Link>
              </Show>
            </Flex>
            {i !== sortedReports.length - 1 && <Divider />}
          </>
        ))}
      </Box>
    </>
  );
};

export default NextRportsTab;
