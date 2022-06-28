import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Text,
  Show,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import CompanyTab from './CompanyTab';
import ContactTab from './ContactTab';
import CompanyReportsTab from './CompanyReportsTab';

const Company = ({ company }) => {
  const latestDate = () => {
    return new Date(Math.max(...company.reports.map(e => new Date(e.date))));
  };
  const nextDate = () => {
    return new Date(
      Math.min(...company.reports.map(e => new Date(e.nextReport)))
    );
  };
  return (
    <AccordionItem>
      <AccordionButton _expanded={{ bg: 'gray.100' }}>
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
            <AccordionIcon />
          </Box>
        </Flex>
      </AccordionButton>
      <AccordionPanel py="24px" px="38px">
        <Tabs variant="enclosed">
          <TabList>
            <Tab>פרטי החברה</Tab>
            <Tab>אנשי קשר</Tab>
            <Tab>סקירות</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CompanyTab company={company} />
            </TabPanel>
            <TabPanel>
              <ContactTab contacts={company?.contacts} company={company} />
            </TabPanel>
            <TabPanel>
              <CompanyReportsTab company={company} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Company;
