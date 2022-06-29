import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';

import MessagesTab from './MessagesTab';
import NextRportsTab from './NextRportsTab';
import useWidth from '../../../hooks/useWidth';

const Notifications = () => {
  const width = useWidth();
  return (
    <Box p={width > 500 ? '2em' : '0.75em'}>
      <Tabs>
        <TabList>
          <Tab>תסקירים קרובים</Tab>
          <Tab>הודעות</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NextRportsTab />
          </TabPanel>
          <TabPanel>
            <MessagesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Notifications;
