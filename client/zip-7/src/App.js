import React, { useEffect } from 'react';
import { ChakraProvider, Grid, Spinner, theme } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './app.css';

import Login from './components/auth/Login';
import { RTLProvider } from './components/RTLProvider';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/auth/Signup';
import { loadUser } from './redux/actions/auth';
import ProtectedRoute from './components/ProtectedRoute';
import ReoprtPDF from './components/dashboard/reports/ReoprtPDF';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return (
      <Grid w="100%" h="100vh" placeItems="center">
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
    <ChakraProvider theme={theme}>
      <RTLProvider>
        <Router>
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/">
              <Redirect to="/dashboard/reports" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/reports/pdf" component={ReoprtPDF} />
          </Switch>
        </Router>
      </RTLProvider>
    </ChakraProvider>
  );
}

export default App;
