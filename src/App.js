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

class App extends React.Component {
  state = {
    synth: null,
    piano: null,
    snare: null,
    kick: null,
    hh: null,
    user: {}
  }

  componentDidMount = () => {
    const snare = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/snare.wav").toDestination();
    const kick = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav").toDestination();
    const hh = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-close.wav").toDestination();
    const piano = new Tone.Sampler({
      urls: {
          "C4": "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          "A4": "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    const synth = new Tone.PolySynth().toDestination();
    Tone.loaded().then(() => {
      this.setState({
        synth: synth,
        piano: piano,
        snare: snare,
        kick: kick,
        hh: hh
      })
    })
    // fetch('http://localhost:3000/users/3')
    // .then(resp => resp.json())
    // .then(user => this.setState({user: user}))
    let token = localStorage.getItem('token')
    console.log("token", token)
    if (token) {
      console.log('token:', token)
      fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }}).then(resp => resp.json())
        .then(resp => this.setState({user: resp.user}))
    }
  }

  editHandler = (song) => {
    return <Grid player={this.player} playHandler={this.playHandler} song={song}/>
  }

  displayNav = () => {
    console.log('clicked')
    let navbar = document.querySelector('.navbar')
    if (navbar.style.display === 'none') {
      return navbar.style.display ='flex'
    } else {
      return navbar.style.display = 'none'
    }
  }

  loginHandler = (e, state) => {
    // e.preventDefault()
    let user = {
      username: state.username,
      password: state.password
    }
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({user: user})
    }).then(resp => resp.json())
    .then(result => {
      if (result.user) {
        console.log(result.user)
        localStorage.setItem('token', result.jwt)
        this.setState({user: result.user})
      } else console.log(result.message)
    })
  }

  signUpHandler = (e, state) => {
    // e.preventDefault()
    let user = {
      username: state.username,
      password: state.password
    }
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({user: user})
    }).then(resp => resp.json())
    .then(result => {
      console.log(result)
      localStorage.setItem('token', result.jwt);
      this.setState({user: result.user});
    })
  }

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.setState({user: {}})
  }

  render() {
    console.log("USER", this.state.user)
      return (
        this.state.synth 
        ?
        <div className="App">
          {/* <header className="App-header">
          </header> */}
          <BrowserRouter className='App-Content'>
            <div className='navbar-with-image'>
              <MenuIcon displayNav={this.displayNav}/>
              <NavBar user={this.state.user} />
            </div>
            <Route exact path={'/users/:id'} render={(routerProps) => <UserPage state={this.state} id={routerProps.match.params.id}/>}/>
            <Route exact path='/songs/:id/edit' render={(routerProps) => <Grid state={this.state} song_id={routerProps.match.params.id} />}/>
            <Route exact path='/songs' render={() => <SongsContainer state={this.state} editHandler={this.editHandler} />}/>
            <Route exact path='/login' render={() => this.state.user.id ?
              <Redirect to='/'/>
              :
              <Login loginHandler={this.loginHandler} signUpHandler={this.signUpHandler}/>}/>
            <Route path="/logout" render={() => this.state.user.id ?
              this.logoutHandler()
              :
              <Redirect to={'/login'}/>}/>
            <Route exact path='/' render={() => <Grid state={this.state} />}/>
          </BrowserRouter>
        </div>
        :
        "loading sounds"
      );
    }
  }

export default App;
