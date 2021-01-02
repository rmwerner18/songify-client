import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Tone from 'tone'
import modes from '../modes'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { startSong, stopSong } from '../actions/set_is_playing'
import { setCurrentSong } from '../actions/set_current_song'
import { setNowPlaying } from '../actions/set_now_playing'
import { endNowPlaying } from '../actions/end_now_playing' 
import player from '../player'
import { useState } from 'react'
import { connect } from 'react-redux'


const Song = (props) => {

    const startLoop = () => {
        let array = []
        let newObj = Object.assign({}, props, props.song)
        setNumOfEigthNotes(32, array)
        new Tone.Sequence((time, index) => {
            player(index, time, newObj)
        }, array).start(0)
        Tone.Transport.start();
    }

    const playHandler = (e) => {
        if (Tone.Transport.state === "started" && props.nowPlaying.id === props.song.id) {
            props.endNowPlaying()
            stopLoop()
        } else {
            stopLoop()
            props.setNowPlaying(props.song)
            Tone.Destination.context.resume().then(() => {
                startLoop()
            })
        }
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
    <button className="song-list-start-button" onClick={(e) => playHandler(e, props.song)}>{props.nowPlaying.id === props.song.id ? <span>||</span> : <span>▶</span>}</button>
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
    return {
        synth: sounds.synth,
        piano: sounds.piano,
        snare: sounds.snare,
        kick: sounds.kick,
        hh: sounds.hh,
        nowPlaying: state.nowPlaying,
        user: state.user
    }
}
 
export default connect(mapStateToProps, { startSong, stopSong, setCurrentSong, setNowPlaying, endNowPlaying})(Song)