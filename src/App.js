import React from 'react';
import './App.css';
import * as Tone from 'tone'
import Grid from './containers/grid'
import SongsContainer from './containers/songs_container'
import UserPage from './containers/user_page'
import { BrowserRouter, Route } from 'react-router-dom';
import modes from './modes'

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
    fetch('http://localhost:3000/users/3')
    .then(resp => resp.json())
    .then(user => this.setState({user: user}))
  }

  editHandler = (song) => {
    return <Grid player={this.player} playHandler={this.playHandler} song={song}/>
  }

  render() {
      return (
        this.state.synth 
        ?
        <div className="App">
          {/* <header className="App-header">
          </header> */}
          <BrowserRouter className='App-Content'>
            <Route exact path={`/users/${this.state.user.id}`} render={() => <UserPage  player={this.player} state={this.state} playHandler={this.playHandler}/>}/>
            <Route exact path='/songs/:id/edit' render={(routerProps) => <Grid player={this.player} state={this.state} playHandler={this.playHandler} song_id={routerProps.match.params.id}  />}/>
            <Route exact path='/songs' render={() => <SongsContainer player={this.player} state={this.state} playHandler={this.playHandler} editHandler={this.editHandler} />}/>
            <Route exact path='/' render={() => <Grid player={this.player} state={this.state} playHandler={this.playHandler} />}/>
          </BrowserRouter>
        </div>
        :
        "loading sounds"
      );
    }
  }

export default App;
