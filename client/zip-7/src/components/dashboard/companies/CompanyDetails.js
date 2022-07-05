import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import CompanyTab from './CompanyTab';
import ContactTab from './ContactTab';
import CompanyReportsTab from './CompanyReportsTab';

const CompanyDetails = ({ match }) => {
  const [company, setCompany] = useState(null);
  const { companies } = useSelector(state => state.companies);
  useEffect(() => {
    const company = companies.find(c => c._id === match.params.id);
    setCompany(company);
  }, [companies]);
  if (!company) return null;
  return (
    <Tabs>
      <TabList>
        <Tab padding="1em">פרטי החברה</Tab>
        <Tab padding="1em">אנשי קשר</Tab>
        <Tab padding="1em">סקירות</Tab>
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
  );
};

export default CompanyDetails;
