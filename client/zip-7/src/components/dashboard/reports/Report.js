import React from 'react';
import { Show, Box, Text, Flex, Icon } from '@chakra-ui/react';
import Moment from 'react-moment';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useRoute } from '../../../hooks/useRoute';

const Report = ({ report }) => {
  const history = useHistory();
  const route = useRoute();
  return (
    <Box borderBottom="1px solid lightgrey">
      <Flex py="16px" w="100%">
        {route !== 'clients' && (
          <Box flex={3}>
            <Text textAlign="center" fontWeight="bold">
              {' '}
              {report.company.name}
            </Text>
          </Box>
        )}
        <Show breakpoint="(min-width: 992px)">
          <Box flex={3}>
            <Text textAlign="center"> {report.review.type}</Text>
          </Box>
        </Show>
        <Box flex={3}>
          <Text textAlign="center">
            {' '}
            <Moment date={report.date} format="DD/MM/YYYY" />
          </Text>
        </Box>

        <Box flex={3}>
          <Text textAlign="center">{`${report.reviewer.firstName} ${report.reviewer.lastName}`}</Text>
        </Box>

        <Box flex={1} textAlign="center">
          <Icon
            as={FiArrowLeftCircle}
            cursor="pointer"
            _hover={{ fontSize: '18px' }}
            transition="all 0.2s ease-in-out"
            onClick={() => history.push(`/dashboard/reports/${report._id}`)}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Report;
