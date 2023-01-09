import React from 'react';
import './App.css';
import GridPage from './containers/grid_page'
import SongsPage from './containers/songs_page'
// import UserPage from './containers/user_page'
import NavBar from './containers/nav_bar'
import LoginPage from './containers/login_page'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { fetchSounds } from './actions/fetch_sounds'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchUserFromToken} from './actions/set_user'
import { logout } from './actions/logout'

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
        <h1 className="logo">Songify<span>lite</span></h1>
          <NavBar user={user}/>
        <Route 
          exact path='/songs/:id/edit' 
          render={(routerProps) => <GridPage song_id={routerProps.match.params.id} />}/>
        <Route 
          exact path='/songs' 
          render={() => <SongsPage/>}/>
        <Route 
          exact path='/login' 
          render={() => user.id ?
            <Redirect to='/'/>
            :
            <LoginPage/>}/>
        <Route 
          path="/logout" 
            render={() => {
              dispatch(logout())
              return <Redirect to={'/login'}/>
            }} />
        <Route 
          exact path='/' 
          render={() => <GridPage/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
