import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/user';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return <Redirect to={'/login'} />;
};

export default Logout;
