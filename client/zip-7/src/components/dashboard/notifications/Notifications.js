import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';

import MessagesTab from './MessagesTab';
import NextRportsTab from './NextRportsTab';

const Notifications = () => {
  return (
    <Box p="2em">
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
