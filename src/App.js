import React from 'react';
import './App.css';
import GridPage from './containers/grid_page'
import SongsPage from './containers/songs_page'
import NavBar from './containers/nav_bar'
import LoginPage from './containers/login_page'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { fetchSounds } from './actions/fetch_sounds'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserFromToken } from './actions/set_user'
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/logout';
import Logo from './components/logo';

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user) 

  dispatch(fetchSounds())
  const token = localStorage.getItem('token')
  if (token && (!user.id)) {
    dispatch(fetchUserFromToken(token))
  }
  
  return (
    <div className="App">
      <BrowserRouter className='App-Content'>
        <Logo/>
        <NavBar user={user}/>
        <Route 
          exact path='/songs/:id/edit' 
          render={(routerProps) => {
            <PrivateRoute>
              <GridPage song_id={routerProps.match.params.id} />
            </PrivateRoute>
          }}
        /> 
        <Route 
          exact path='/songs' 
          render={() => <SongsPage/>}
        />
        <Route 
          exact path='/login' 
          render={() => user.id ? <Redirect to='/'/> : <LoginPage/>}
        />
        <Route 
          path="/logout" 
            render={() => <Logout/>} 
        />
        <Route 
          exact path='/' 
          render={() => <GridPage/>}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
