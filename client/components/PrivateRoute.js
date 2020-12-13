import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  const userInfo = useSelector((state) => state.loginStatus);
  return (userInfo.userId ? <Component {...props} /> : <Redirect to="/signin" />);
}
