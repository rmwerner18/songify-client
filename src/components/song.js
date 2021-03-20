import React, { useState } from 'react'
import DeleteAndEditButtons from './delete_and_edit_buttons'
import * as Tone from 'tone'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { setCurrentSong } from '../actions/set_current_song'
import { setNowPlaying } from '../actions/set_now_playing'
import { endNowPlaying } from '../actions/end_now_playing' 
import player from '../player'
import { connect } from 'react-redux'


const Song = (props) => {

    const [userLikesSong, setUserLikesSong] = useState(props.song.likes.find(like => like.user_id === props.user.id))
    const [likes, setLikes] = useState(props.song.likes.length)
    const [hasBeenUnlikedOnUserPage, setHasBeenUnlikedOnUserPage] = useState(false)


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

    const likeHandler = (e) => {
        userLikesSong ? setLikes(likes - 1) : setLikes(likes + 1)
        if (userLikesSong && props.userPage) {
            setHasBeenUnlikedOnUserPage(true)
        }
        setUserLikesSong(!userLikesSong)
        props.likeHandler(e)
    }

    const songBelongsToUser = () => props.song.user.id === props.user.id && props.user.id

    stopLoop()

    return (
        hasBeenUnlikedOnUserPage
        ?
        null
        : 
        <div className="song-box">
            <h2 className="song-title">{props.song.name}</h2>
            <p className="song-maker">By: {props.song.user.username}</p>
            
            <div className='song-list-start-button-container'>
                <button className="song-list-start-button" onClick={(e) => playHandler(e, props.song)}>{props.nowPlaying.id === props.song.id ? <span>||</span> : <span>▶</span>}</button>
            </div>

            <div className='song-options'>
                {songBelongsToUser() ? <DeleteAndEditButtons id={props.id} deleteHandler={props.deleteHandler}/> : null}
                {!songBelongsToUser() && props.user.id ? <button id={`like-button-${props.song.id}`} className='like-button' onClick={likeHandler}>{userLikesSong ? "Unlike" : "Like"}</button> : null}
                <span>likes: <span id={`like-count-${props.id}`} className='like-count'>{likes}</span></span>
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
 
export default connect(mapStateToProps, { setCurrentSong, setNowPlaying, endNowPlaying})(Song)