import {
  Box,
  Text,
  Show,
  Flex,
  Accordion,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanies } from '../../../redux/actions/companies';
import Company from './Company';

const Companies = () => {
  const dispatch = useDispatch();
  const { loading, companies } = useSelector(state => state.companies);
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  if (loading && companies.length === 0) {
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
      </Grid>
    );
  }
  return (
    <Flex direction="column">
      <Flex padding="16px" borderBottom="1px solid gray">
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center"> שם החברה:</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center">עיר:</Text>
        </Box>
        <Box flex={3} borderRight="1px solid lightgray">
          <Text textAlign="center"> איש קשר ראשי:</Text>
        </Box>
        {
          <Show breakpoint="(min-width: 992px)">
            {' '}
            <Box flex={3} borderRight="1px solid lightgray">
              <Text textAlign="center">סקירה אחרונה:</Text>
            </Box>
          </Show>
        }
        {
          <Show breakpoint="(min-width: 992px)">
            <Box flex={3}>
              <Text textAlign="center">סקירה הבאה:</Text>
            </Box>{' '}
          </Show>
        }
        <Box flex={1}></Box>
      </Flex>
      <Accordion allowToggle>
        {companies.map(company => (
          <Company key={company._id} company={company} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default Companies;
