import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Show,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import Moment from 'react-moment';


import ReportDetails from './ReportDetails';

const Report = ({ report }) => { 
 
  return (
    <AccordionItem>
     
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
      <ReportDetails report={report}/>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Report;
