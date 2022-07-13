import React from 'react';
import { Icon, Box, Flex, Text, Show } from '@chakra-ui/react';
import Moment from 'react-moment';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

const Company = ({ company }) => {
  const history = useHistory();
  const latestDate = () => {
    return new Date(Math.max(...company.reports.map(e => new Date(e.date))));
  };
  const nextDate = () => {
    return new Date(
      Math.min(...company.reports.map(e => new Date(e.nextReport)))
    );
  };
  return (
    <>
      <Flex padding="16px" w="100%">
        <Box flex={3}>
          <Text textAlign="center" fontWeight="bold">
            {' '}
            {company.name}
          </Text>
        </Box>
        <Box flex={3}>
          <Text textAlign="center">{company.city}</Text>
        </Box>
        <Box flex={3}>
          <Text textAlign="center">{`${company.primaryContact.firstName} ${company.primaryContact.lastName}`}</Text>
        </Box>
        {
          <Show breakpoint="(min-width: 992px)">
            <Box flex={3}>
              <Text textAlign="center">
                {company?.reports?.length > 0 ? (
                  <Moment date={latestDate()} format="DD/MM/YYYY" />
                ) : (
                  '-'
                )}
              </Text>
            </Box>{' '}
          </Show>
        }
        {
          <Show breakpoint="(min-width: 992px)">
            <Box flex={3}>
              <Text textAlign="center">
                {' '}
                {company?.reports?.length > 0 ? (
                  <Moment date={nextDate()} format="DD/MM/YYYY" />
                ) : (
                  '-'
                )}
              </Text>
            </Box>
          </Show>
        }
        <Box flex={1}>
          <Icon
            as={FiArrowLeftCircle}
            cursor="pointer"
            _hover={{ fontSize: '18px' }}
            transition="all 0.2s ease-in-out"
            onClick={() => history.push(`/dashboard/clients/${company._id}`)}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Company;
