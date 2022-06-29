import React, { useState, useEffect } from 'react';
import { Box, Divider, Flex, Link } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Link as RouterLink } from 'react-router-dom';

const NextRportsTab = () => {
  const [sortedReports, setSortedReports] = useState([]);
  const { reports } = useSelector(state => state.reports);

  useEffect(() => {
    const sortedReports = reports
      .sort((a, b) => {
        return new Date(a.nextReport) - new Date(b.nextReport);
      })
      .filter(e => new Date(e.nextReport) > new Date());
    setSortedReports(sortedReports);
  }, [reports]);
  return (
    <>
      <Flex textAlign="center" padding="0.5em 1em">
        <Box flex={1}>חברה</Box>
        <Box flex={2}>תסקיר</Box>
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
            <Flex key={e._id} textAlign="center" py="12px">
              <Link
                as={RouterLink}
                to={`/dashboard/clients/${e.company._id}`}
                flex={1}
                color="blue.600"
              >
                {e.company.name}
              </Link>
              <Box flex={2}>{e.review.type}</Box>
              <Box flex={1}>
                <Moment date={e.nextReport} format="DD/MM/YYYY" />
              </Box>
              <Link
                as={RouterLink}
                to={`/dashboard/reports/${e._id}`}
                flex={1}
                color="blue.600"
              >
                ראה תסקיר אחרון
              </Link>
            </Flex>
            {i !== sortedReports.length - 1 && <Divider />}
          </>
        ))}
      </Box>
    </>
  );
};

export default NextRportsTab;
