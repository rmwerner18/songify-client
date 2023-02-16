import React, { useEffect, useState } from 'react';
import './App.css';
import GridPage from './containers/grid_page';
import SongsPage from './containers/songs_page';
import NavBar from './containers/nav_bar';
import LoginPage from './containers/login_page';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { fetchSounds } from './actions/fetch_sounds';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './actions/set_user';
import RenderPrivateRoute from './components/private_route';
import Logout from './components/logout';
import Logo from './components/logo';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSounds());
    dispatch(fetchUser());
  }, []);

  return (
    <div className='App'>
      <BrowserRouter className='App-Content'>
        <Logo />
        <NavBar user={user} />
        <Route
          exact
          path='/songs/:id/edit'
          render={(routerProps) => (
            <RenderPrivateRoute
              routerProps={routerProps}
              Component={GridPage}
            />
          )}
        />
        <Route exact path='/songs' render={() => <SongsPage type='all'/>} />
        <Route exact path='/users/:id/songs' render={() => <SongsPage type='user'/>} />
        <Route exact path='/user/:id/likes' render={() => <SongsPage type='liked'/>} />
        <Route
          exact
          path='/playlists/:id'
          render={(routerProps) => (
            <SongsPage type='playlist' playlistId={routerProps.match.params.id} />
          )}
        />
        <Route
          exact
          path='/login'
          render={() => (user.id ? <Redirect to='/' /> : <LoginPage />)}
        />
        <Route path='/logout' render={() => <Logout />} />
        <Route exact path='/' render={() => <GridPage />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
