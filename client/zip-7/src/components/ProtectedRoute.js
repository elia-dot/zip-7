import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
  const { isAuth } = useSelector(state => state.auth);
  if (!isAuth) return <Redirect to="/login" />;
  return <Route {...props}>{children}</Route>;
};

export default ProtectedRoute;
