import React, { useEffect } from 'react';
import { Box, Button, Flex, Show, Icon } from '@chakra-ui/react';
import { BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SideNav from '../SideNav';
import Reports from './reports/Reports';
import Companies from './companies/Companies';
import Notifications from './notifications/Notifications';
import Logs from './logs/Logs';
import { useRoute } from '../../hooks/useRoute';
import CompaniesControls from './companies/CompaniesControls';
import ReportsControls from './reports/ReportsControls';
import ReportDetails from './reports/ReportDetails';
import CompanyDetails from './companies/CompanyDetails';
import Users from '../users/Users';
import UserDetails from '../users/UserDetails';
import Invoices from './invoices/Invoices';
import { icountLogin } from '../../redux/actions/icount';

const Dashboard = () => {
  const [show, setShow] = React.useState(false);
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      icountLogin({
        cid: process.env.REACT_APP_ICOUNT_CID,
        user: process.env.REACT_APP_ICOUNT_USER,
        pass: process.env.REACT_APP_ICOUNT_PASS,
      })
    );
  }, [dispatch]);

  return (
    <Flex padding="16px" boxSizing="border-box" minHeight="100vh" bg="gray.200">
      <Box height="95vh">
        <Show above="md">
          {' '}
          <SideNav setShow={setShow} />
        </Show>
      </Box>
      <Box flex={1}>
        <Flex height="90px">
          <Box flex={1} height="100%">
            {route === 'clients' && <CompaniesControls />}
            {route === 'reports' && <ReportsControls />}
          </Box>
          <Show below="md">
            <Flex p="15px">
              <Button
                bg="blue.600"
                borderRadius="50%"
                width="50px"
                height="50px"
                _hover={{ bg: '#000' }}
                transition="all 0.2s"
                ml="auto"
                boxShadow="2px 2px 10px 1px rgba(0,0,0,0.2)"
                onClick={() => setShow(!show)}
              >
                <Icon
                  as={show ? IoMdClose : BiMenu}
                  color="#fff"
                  w={10}
                  h={10}
                />
              </Button>
            </Flex>
          </Show>
        </Flex>
        <Box
          position="fixed"
          start={0}
          transform={show ? 'translateX(0)' : 'translateX(-200%)'}
          transition="all 0.3s"
          opacity={show ? 1 : 0}
          zIndex={999}
        >
          <SideNav setShow={setShow} />
        </Box>

        <Box
          bg="white"
          minHeight="calc(95vh - 90px)"
          maxHeight="calc(95vh - 90px)"
          width="95%"
          mx="auto"
          borderRadius="15px"
          boxShadow="2px 2px 10px 1px rgba(0,0,0,0.2)"
          position="relative"
          overflowY="auto"
          className="scrollbar"
        >
          <Switch>
            <Route
              exact
              path="/dashboard/reports"
              render={props => <Reports {...props} />}
            />
            <Route
              exact
              path="/dashboard/clients"
              render={props => <Companies {...props} />}
            />
            <Route
              exact
              path="/dashboard/reminders"
              render={props => <Notifications {...props} />}
            />
            <Route
              exact
              path="/dashboard/logs"
              render={props => <Logs {...props} />}
            />
            <Route
              exact
              path="/dashboard/users"
              render={props => <Users {...props} />}
            />
            <Route
              exact
              path="/dashboard/invoices"
              render={props => <Invoices {...props} />}
            />
            <Route
              path="/dashboard/reports/:id"
              render={props => <ReportDetails {...props} />}
            />
            <Route
              path="/dashboard/clients/:id"
              render={props => <CompanyDetails {...props} />}
            />
            <Route
              path="/dashboard/users/:id"
              render={props => <UserDetails {...props} />}
            />
          </Switch>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
