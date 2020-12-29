// import * as Tone from 'tone'
// import modes from './modes'

// const player = (index, time, state, props) => {
//     console.log(state.hhBeats)
    
//     let chords = state.chords.map(chord => chord.freqs)
//     Tone.Transport.bpm.value = parseInt(state.bpm)
//     let instrument
//     if (state.instrument === 'synth') {
//       instrument = props.state.synth
//     } else if (state.instrument === 'piano') {
//       instrument = props.state.piano
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
//     if (state.kickBeats.includes(index)) {
//         props.state.kick.start(time)
//     }
//     if (state.snareBeats.includes(index)) {
//         props.state.snare.start(time)
//     }
//     if (state.hhBeats.includes(index)) {
//         props.state.hh.start(time);
//     }
//     if (state.iBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[0], '8n', time)
//     }
//     if (state.iiBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[1], '8n', time)
//     }
//     if (state.iiiBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[2], '8n', time)
//     }
//     if (state.ivBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[3], '8n', time)
//     }
//     if (state.vBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[4], '8n', time)
//     }
//     if (state.viBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[5], '8n', time)
//     }
//     if (state.viiBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[6], '8n', time)
//     }
//     if (state.IBeats.includes(index)) {
//         instrument.triggerAttackRelease(modes[state.melodyMode](state.melodyKey)[7], '8n', time)
//     }
//   }

//   export default player