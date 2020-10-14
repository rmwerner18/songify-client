import React from 'react'
import { NavLink } from 'react-router-dom'
import Grid from '../containers/grid'
import * as Tone from 'tone'
import Chord from '../components/chord'
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import modes from '../modes'
import defaultChords from '../default_chords'
import drumPresets from '../drum_presets'
import chordPresets from '../chord_presets'

const Song = (props) => {

    const showModal = () => {
        document.getElementById(`chord-edit-modal-${props.song.id}`).style.display = 'block'
    }

    const closeHandler = () => {
        document.getElementById(`chord-edit-modal-${props.song.id}`).style.display = 'none'
    }


  const player = (index, time) => {
    let chords = props.song.chords.map(chord => chord.freqs)
    Tone.Transport.bpm.value = parseInt(props.song.bpm)
    let instrument
    if (props.song.instrument === 'synth') {
      instrument = props.state.synth
    } else if (props.song.instrument === 'piano') {
      instrument = props.state.piano
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
    if (props.song.kickBeats.includes(index)) {
        props.state.kick.start(time)
    }
    if (props.song.snareBeats.includes(index)) {
        props.state.snare.start(time)
    }
    if (props.song.hhBeats.includes(index)) {
        props.state.hh.start(time);
    }
    if (props.song.iBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[0], '8n', time)
    }
    if (props.song.iiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[1], '8n', time)
    }
    if (props.song.iiiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[2], '8n', time)
    }
    if (props.song.ivBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[3], '8n', time)
    }
    if (props.song.vBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[4], '8n', time)
    }
    if (props.song.viBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[5], '8n', time)
    }
    if (props.song.viiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[6], '8n', time)
    }
    if (props.song.IBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[props.song.melodyMode](props.song.melodyKey)[7], '8n', time)
    }
  }

  const setNumOfEigthNotes = (n, array) => {
    for (let i=0; i<n; i++) {
        array.push(i)
    }
  }

  const startLoop = () => {
    let array = []
    setNumOfEigthNotes(32, array)
    const seq = new Tone.Sequence((time, index) => {
        player(index, time)
    }, array).start(0)
    Tone.Transport.start();
  }

  const stopLoop = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
  }

  const playHandler = (e) => {
    // HANDLES LOOP
    if (Tone.Transport.state === "stopped") {
      Tone.Destination.context.resume().then(() => {
        startLoop()
      })
      e.target.innerText = 'Stop'
    } else {
        stopLoop()
        e.target.innerText = 'Start'
    }
  }


    return (
        <>
            {/* <div id={`chord-edit-modal-${props.song.id}`} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeHandler}>&times;</span>
                    <div>
                        {<Grid player={props.player} playHandler={props.playHandler} song={props.song}/>}
                    </div>
                </div>
            </div> */}
            <div className="song-box">
                <p>{props.song.id}</p>
                <button onClick={(e) => playHandler(e, props.song)}>Start</button>
                <button onClick={() => props.deleteHandler(props.song)}>Delete</button>
                <NavLink to={`/songs/${props.song.id}/edit`}>
                    <button>Edit</button>
                </NavLink>
            </div>
        </>
    )

}
 
export default Song