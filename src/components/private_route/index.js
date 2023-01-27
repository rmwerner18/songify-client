import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoadingPage from '../loading_page';

const PrivateRoute = ({ children, user }) => {
  return user.id ? children : <Redirect to='/login' />;
};

const RenderPrivateRoute = ({ Component, routerProps }) => {
  const user = useSelector((state) => state.user);
  return user.loaded ? (
    <PrivateRoute user={user}>
      <Component song_id={routerProps.match.params.id} />
    </PrivateRoute>
  ) : (
    <LoadingPage />
  );
};

export default RenderPrivateRoute;
