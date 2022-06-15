import React, { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Login from './components/auth/Login';
import { RTLProvider } from './components/RTLProvider';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/auth/Signup';
import { loadUser } from './redux/actions/auth';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(1111);
    dispatch(loadUser());
  },[dispatch])
  return (
    <ChakraProvider theme={theme}>
      <RTLProvider>
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Dashboard} /> */}
            <ProtectedRoute exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
      </RTLProvider>
    </ChakraProvider>
  );
}

export default App;
