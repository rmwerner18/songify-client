import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Tone from 'tone'
import modes from '../modes'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { startSong, stopSong } from '../actions/set_is_playing'
import player from '../player'
import { useState } from 'react'
import { connect } from 'react-redux'


const Song = (props) => {

    const startLoop = () => {
        let array = []
        setNumOfEigthNotes(32, array)
        new Tone.Sequence((time, index) => {
            player(index, time, props)
        }, array).start(0)
        Tone.Transport.start();
    }

    const playHandler = (e) => {
        // console.log(e.target.innerHTML)
        // console.log(e.target.innerText)

        // // HANDLES LOOP
        // if (Tone.Transport.state === "stopped") {
        //     Tone.Destination.context.resume().then(() => {
        //         startLoop()
        //     })
        //     if (e.target.innerHTML === "<span>▶</span>") {
        //         e.target.innerHTML = "<span>||</span>"
        //     } else if (e.target.innerHTML === "▶") {
        //         e.target.innerHTML = "||"
        //     }
        // } else if (Tone.Transport.state === "started" && e.target.innerText === "▶") {
        //     let elements = document.getElementsByClassName('song-list-start-button')
        //     let array = Array.from(elements)
        //     let item = array.find(el => el.innerHTML === "<span>||</span>")
        //     console.log('item', item)
        //     item.innerHTML = "<span>▶</span>"
        //     if (e.target.innerHTML === "<span>▶</span>") {
        //         e.target.innerHTML = "<span>||</span>"
        //     } else if (e.target.innerHTML === "▶") {
        //         e.target.innerHTML = "||"
        //     }
        //     stopLoop()
        //     Tone.Destination.context.resume().then(() => {
        //         startLoop()
        //     })
        // }
        // else {
        //     stopLoop()
        //     if (e.target.innerHTML === "<span>||</span>") {
        //         e.target.innerHTML = "<span>▶</span>"
        //     } else if (e.target.innerHTML === "||") {
        //         e.target.innerHTML = "▶"
        //     }
        // }

        // if (Tone.Transport.state === "stopped") {
        //     Tone.Destination.context.resume().then(() => {
        //         startLoop()
        //         props.startSong()
        //     })
        // } else if (Tone.Transport.state === "started" && props.id != props.song_id)

        
    }

    const userLikesSong = () => {
        return props.song.likes.find(like => like.user_id === props.user.id)
    }

    stopLoop()

    return (
        <div className="song-box">
            <h2 className="song-title">{props.song.name}</h2>
            <p className="song-maker">Created By: {props.song.user.username}</p>
            <div className='song-list-start-button-container'>
    <button className="song-list-start-button" onClick={(e) => playHandler(e, props.song)}>{props.isPlaying ? <span>||</span> : <span>▶</span>}</button>
            </div>
            <div className='song-options'>
                {props.user.id === props.user_id
                ?
                <>
                    <button onClick={() => props.deleteHandler(props)}>Delete</button>
                    <NavLink to={`/songs/${props.id}/edit`}>
                        <button onClick={stopLoop}>Edit</button>
                    </NavLink>
                </>
                :
                null
                }
                {(props.user_id !== props.user.id && props.user.id)
                ?
                <button id={`like-button-${props.song.id}`} onClick={(e) => props.likeHandler(e)}>{userLikesSong() ? "Unlike" : "Like"}</button>       
                :
                null}
                <span>likes: <span id={`like-count-${props.id}`}>{props.song.likes.length}</span></span>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    let sounds = state.sounds
    let song = state.currentSong
    return {
        synth: sounds.synth,
        piano: sounds.piano,
        snare: sounds.snare,
        kick: sounds.kick,
        hh: sounds.hh,
        user_id: song.user_id,
        likes: song.likes,
        chords: song.chords,
        bpm: song.bpm,
        snareBeats: song.snareBeats,
        kickBeats: song.kickBeats,
        hhBeats: song.hhBeats,
        instrument: song.instrument,
        iBeats: song.iBeats,
        iiBeats: song.iiBeats,
        iiiBeats: song.iiiBeats,
        ivBeats: song.ivBeats,
        vBeats: song.vBeats,
        viBeats: song.viBeats,
        viiBeats: song.viiBeats,
        IBeats: song.IBeats,
        melodyKey: song.melodyKey,
        melodyMode: song.melodyMode,
        isPlaying: song.isPlaying,
        user: state.user
    }
}
 
export default connect(mapStateToProps, { startSong, stopSong })(Song)