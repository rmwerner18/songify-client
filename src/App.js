import React from 'react';
import './App.css';
import GridPage from './containers/grid_page'
import SongsPage from './containers/songs_page'
import UserPage from './containers/user_page'
import NavBar from './containers/nav_bar'
import MenuIcon from './components/menu_icon'
import LoginPage from './containers/login_page'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { fetchSounds } from './actions/fetch_sounds'
import { connect } from 'react-redux'
import { fetchUserFromToken} from './actions/set_user'
import { logout } from './actions/logout'

class App extends React.Component {

  componentDidMount = () => {
    this.props.fetchSounds()
    let token = localStorage.getItem('token')
    if (token) {
      this.props.fetchUserFromToken(token)
    }
  }

  render() {
      return (
        <div className="App">
          <BrowserRouter className='App-Content'>
            <h1 className="logo">Songify<span>lite</span></h1>
              { this.props.navbar ? <NavBar user={this.props.user}/> : null }
            <Route 
              exact path={'/users/:id'} 
              render={(routerProps) => <UserPage id={routerProps.match.params.id}/>}/>
            <Route 
              exact path='/songs/:id/edit' 
              render={(routerProps) => <GridPage song_id={routerProps.match.params.id} />}/>
            <Route 
              exact path='/songs' 
              render={() => <SongsPage/>}/>
            <Route 
              exact path='/login' 
              render={() => this.props.user.id ?
                <Redirect to='/'/>
                :
                <LoginPage/>}/>
            <Route 
              path="/logout" 
                render={() => {
                  this.props.logout()
                  return <Redirect to={'/login'}/>
                }} />
            <Route 
              exact path='/' 
              render={() => <GridPage/>}/>
          </BrowserRouter>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps, { logout, fetchSounds, fetchUserFromToken })(App);
