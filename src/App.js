import React from 'react';
import './App.css';
import * as Tone from 'tone'
import Grid from './containers/grid'
import SongsContainer from './containers/songs_container'
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
//   player = (index, time, synth, snare, kick, hh, melodyMode, melodyKey) => {
//     let chords = this.state.chords.map(chord => chord.freqs)
//     Tone.Transport.bpm.value = parseInt(this.state.bpm)
//     if ([0, 4].includes(index)) {
//         synth.triggerAttackRelease(chords[0], '2n', time)
//     } else if ([8, 12].includes(index)) {
//         synth.triggerAttackRelease(chords[1], '2n', time)
//     } else if ([16, 20].includes(index)) {
//         synth.triggerAttackRelease(chords[2], '2n', time)
//     } else if ([24, 28].includes(index)) {
//         synth.triggerAttackRelease(chords[3], '2n', time)
//     } 
//     if (this.state.kickBeats.includes(index)) {
//         kick.start(time)
//     }
//     if (this.state.snareBeats.includes(index)) {
//         snare.start(time)
//     }
//     if (this.state.hhBeats.includes(index)) {
//         hh.start(time);
//     }
//     if (this.state.iBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[0], '8n', time)
//     }
//     if (this.state.iiBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[1], '8n', time)
//     }
//     if (this.state.iiiBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[2], '8n', time)
//     }
//     if (this.state.ivBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[3], '8n', time)
//     }
//     if (this.state.vBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[4], '8n', time)
//     }
//     if (this.state.viBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[5], '8n', time)
//     }
//     if (this.state.viiBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[6], '8n', time)
//     }
//     if (this.state.IBeats.includes(index)) {
//         synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[7], '8n', time)
//     }

// }
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <BrowserRouter>
        <Route path='/songs' component={SongsContainer}/>
        <Route path='/' render={() => <Grid/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
