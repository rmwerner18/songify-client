import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Tone from 'tone'
import modes from '../modes'


const Song = (props) => {

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

    const userLikesSong = () => {
        return props.song.likes.find(like => like.user_id === props.state.user.id)
    }

   

    return (
        <div className="song-box">
            <p>{props.song.name}</p>
            <p>{props.song.user.username}</p>
            <button onClick={(e) => playHandler(e, props.song)}>Start</button>
            <button onClick={() => props.deleteHandler(props.song)}>Delete</button>
            <NavLink to={`/songs/${props.song.id}/edit`}>
                <button>Edit</button>
            </NavLink>
            {props.song.user.id != props.state.user.id 
            ?
            <button id={`like-button-${props.song.id}`} onClick={(e) => props.likeHandler(e)}>{userLikesSong() ? "Unlike" : "Like"}</button>       
            :
            null}
            <span>likes: <span id={`like-count-${props.song.id}`}>{props.song.likes.length}</span></span>
        </div>
    )

}
 
export default Song