import React from 'react';
import './App.css';
import * as Tone from 'tone'
import Grid from './containers/grid'
import SongsContainer from './containers/songs_container'
import UserPage from './containers/user_page'
import NavBar from './containers/nav_bar'
import MenuIcon from './components/menu_icon'
import Login from './components/login'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { fetchSounds } from './actions/fetch_sounds'
import { connect } from 'react-redux'
import { fetchUserFromToken, login, signUp } from './actions/set_user'
import { logout } from './actions/logout'

class App extends React.Component {

  componentDidMount = () => {
    this.props.fetchSounds()
    let token = localStorage.getItem('token')
    if (token) {
      this.props.fetchUserFromToken(token)
    }
  }

  editHandler = (song) => {
    return <Grid player={this.player} playHandler={this.playHandler} song={song}/>
  }

  displayNav = () => {
    let navbar = document.querySelector('.navbar')
    if (navbar.style.display === 'none') {
      return navbar.style.display ='flex'
    } else {
      return navbar.style.display = 'none'
    }
  }

  render() {
    console.log(this.props.user)
      return (
        // this.state.synth 
        // ?
        <div className="App">
          {/* <header className="App-header">
          </header> */}
          <BrowserRouter className='App-Content'>
            <div className='navbar-with-image'>
              <MenuIcon displayNav={this.displayNav}/>
              <NavBar user={this.props.user} />
            </div>
            <Route exact path={'/users/:id'} render={(routerProps) => <UserPage id={routerProps.match.params.id}/>}/>
            <Route exact path='/songs/:id/edit' render={(routerProps) => <Grid state={this.state} song_id={routerProps.match.params.id} />}/>
            <Route exact path='/songs' render={() => <SongsContainer state={this.state} editHandler={this.editHandler} />}/>
            <Route exact path='/login' render={() => this.props.user.id ?
              <Redirect to='/'/>
              :
              <Login loginHandler={this.loginHandler} signUpHandler={this.signUpHandler}/>}/>
            <Route path="/logout" render={() => {
                this.props.logout()
                return <Redirect to={'/login'}/>
              }} />
            <Route exact path='/' render={() => <Grid state={this.state} />}/>
          </BrowserRouter>
        </div>
        // :
        // "loading sounds"
      );
    }
  }

  const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps, { logout, fetchSounds, fetchUserFromToken })(App);
