import React from 'react'
import  * as Tone from 'tone'
import modes from './modes'
import { connect } from 'react-redux'
import player from './player'


// const setNumOfEigthNotes = (n, array) => {
//     for (let i=0; i<n; i++) {
//         array.push(i)
//     }
// }

// const startLoop = (playerCaller, props) => {
//     let array = []
//     setNumOfEigthNotes(32, array)
//     new Tone.Sequence((time, index) => {
//         playerCaller(index, time, props)
//     }, array).start(0)
//     Tone.Transport.start();
// }

// export const stopLoop = () => {
//     Tone.Transport.stop()
//     Tone.Transport.cancel()
    
// }

// const player = (index, time) => {
//     console.log(props.hhBeats)
//     let chords = props.chords.map(chord => chord.freqs)
//     Tone.Transport.bpm.value = parseInt(props.bpm)
//     let instrument
//     if (props.instrument === 'synth') {
//       instrument = props.synth
//     } else if (props.instrument === 'piano') {
//       instrument = props.piano
//     }
//     if ([0, 4].includes(index)) {
//         instrument.triggerAttackRelease(chords[0], '2n', time)
//     } else if ([8, 12].includes(index)) {
//         instrument.triggerAttackRelease(chords[1], '2n', time)
//     } else if ([16, 20].includes(index)) {
//         instrument.triggerAttackRelease(chords[2], '2n', time)
//     } else if ([24, 28].includes(index)) {
//         instrument.triggerAttackRelease(chords[3], '2n', time)
//     } 
//     if (props.kickBeats.includes(index)) {
//         props.kick.start(time)
//     }
//     if (props.snareBeats.includes(index)) {
//         props.snare.start(time)
//     }
//     if (props.hhBeats.includes(index)) {
//         props.hh.start(time);
//     }
//     if (props.iBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[0], '8n', time)
//     }
//     if (props.iiBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[1], '8n', time)
//     }
//     if (props.iiiBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[2], '8n', time)
//     }
//     if (props.ivBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[3], '8n', time)
//     }
//     if (props.vBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[4], '8n', time)
//     }
//     if (props.viBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[5], '8n', time)
//     }
//     if (props.viiBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[6], '8n', time)
//     }
//     if (props.IBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[props.melodyMode](props.melodyKey)[7], '8n', time)
//     }
//   }

//   const mapStateToProps = state => {
//     let sounds = state.sounds
//     let song = state.currentSong
//     return {
//         synth: sounds.synth,
//         piano: sounds.piano,
//         snare: sounds.snare,
//         kick: sounds.kick,
//         hh: sounds.hh,
//         user_id: song.user_id,
//         likes: song.likes,
//         chords: song.chords,
//         bpm: song.bpm,
//         snareBeats: song.snareBeats,
//         kickBeats: song.kickBeats,
//         hhBeats: song.hhBeats,
//         instrument: song.instrument,
//         iBeats: song.iBeats,
//         iiBeats: song.iiBeats,
//         iiiBeats: song.iiiBeats,
//         ivBeats: song.ivBeats,
//         vBeats: song.vBeats,
//         viBeats: song.viBeats,
//         viiBeats: song.viiBeats,
//         IBeats: song.IBeats,
//         melodyKey: song.melodyKey,
//         melodyMode: song.melodyMode
//     }
// }

// export default startLoop

