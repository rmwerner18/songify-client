import React from 'react';
import './App.css';
import * as Tone from 'tone'
import Grid from './containers/grid'
import SongsContainer from './containers/songs_container'
import { BrowserRouter, Route } from 'react-router-dom';
import modes from './modes'

class App extends React.Component {
  state = {
    synth: null,
    piano: null,
    snare: null,
    kick: null,
    hh: null
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
  }

  player = (index, time, state) => {
    let chords = state.chords.map(chord => chord.freqs)
    Tone.Transport.bpm.value = parseInt(state.bpm)
    let instrument
    if (state.instrument === 'synth') {
      instrument = this.state.synth
    } else if (state.instrument === 'piano') {
      instrument = this.state.piano
    }
    if ([0, 4].includes(index)) {
        instrument.triggerAttackRelease(chords[0], '2n', time)
    } else if ([8, 12].includes(index)) {
        instrument.triggerAttackRelease(chords[1], '2n', time)
    } else if ([16, 20].includes(index)) {
        instrument.triggerAttackRelease(chords[2], '2n', time)
    } else if ([24, 28].includes(index)) {
        instrument.triggerAttackRelease(chords[3], '2n', time)
    } 
    if (state.kickBeats.includes(index)) {
        this.state.kick.start(time)
    }
    if (state.snareBeats.includes(index)) {
        this.state.snare.start(time)
    }
    if (state.hhBeats.includes(index)) {
        this.state.hh.start(time);
    }
    if (state.iBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[0], '8n', time)
    }
    if (state.iiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[1], '8n', time)
    }
    if (state.iiiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[2], '8n', time)
    }
    if (state.ivBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[3], '8n', time)
    }
    if (state.vBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[4], '8n', time)
    }
    if (state.viBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[5], '8n', time)
    }
    if (state.viiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[6], '8n', time)
    }
    if (state.IBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[7], '8n', time)
    }
  }

  setNumOfEigthNotes = (n, array) => {
    for (let i=0; i<n; i++) {
        array.push(i)
    }
  }

  startLoop = (state) => {
    let array = []
    this.setNumOfEigthNotes(32, array)
    const seq = new Tone.Sequence((time, index) => {
        this.player(index, time, state)
    }, array).start(0);
    seq.start(0)
    Tone.Transport.start();
  }

  stopLoop = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
  }

  playHandler = (e, state) => {
    // HANDLES LOOP
    console.log("TTS:", Tone.Transport.state)
    if (Tone.Transport.state === "stopped" || Tone.context.state === "suspended") {
        this.startLoop(state)
        e.target.innerText = 'Stop'
    } else {
        this.stopLoop()
        e.target.innerText = 'Start'
    }
  }

  editHandler = (song) => {
    console.log('hellooo')
    return <Grid player={this.player} playHandler={this.playHandler} song={song}/>
  }

  render() {
      return (
        this.state.synth 
        ?
        <div className="App">
          {/* <header className="App-header">
          </header> */}
          <BrowserRouter>
            <Route exact path='/songs/:id/edit' render={(routerProps) => <Grid player={this.player} playHandler={this.playHandler} song_id={routerProps.match.params.id}/>}/>
            <Route exact path='/songs' render={() => <SongsContainer player={this.player} playHandler={this.playHandler} editHandler={this.editHandler}/>}/>
            <Route exact path='/' render={() => <Grid player={this.player} playHandler={this.playHandler}/>}/>
          </BrowserRouter>
        </div>
        :
        "loading sounds"
      );
    }
  }

export default App;
