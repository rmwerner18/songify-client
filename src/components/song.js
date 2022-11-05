import React, { useState, useEffect } from 'react'
import DeleteAndEditButtons from './delete_and_edit_buttons'
import * as Tone from 'tone'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { setCurrentSong } from '../actions/set_current_song'
import { setNowPlaying } from '../actions/set_now_playing'
import { endNowPlaying } from '../actions/end_now_playing' 
import { fetchSongs } from '../actions/set_all_songs'
import player from '../player'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' 


const Song = (props) => {

    const like = props.song.likes.find(like => like.user_id === props.user.id)

    const [userLikesSong, setUserLikesSong] = useState(null)
    const [likes, setLikes] = useState(props.song.likes.length)
    const [mouseOver, setMouseOver] = useState(false)

    useEffect(() => {
        setUserLikesSong(!!like)
    })

    console.log('render Song')


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

    const likeHandler = (e, id) => {
        userLikesSong ? setLikes(likes - 1) : setLikes(likes + 1)
        setUserLikesSong(!userLikesSong)
        props.likeHandler(e, id)
    }

    const songBelongsToUser = () => props.song.user.id === props.user.id && props.user.id

    return (
        
        <div 
            className={mouseOver ? "song-box active" : "song-box"}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            {mouseOver ? 
                <div className='song-number' onClick={(e) => playHandler(e, props.song)}>

                    {props.nowPlaying.id === props.song.id 
                        ? 
                        <FontAwesomeIcon icon={solid('pause')} className='font-awesome' />  
                        : 
                        <FontAwesomeIcon icon={solid('play')} className='font-awesome' />
                    }
                </div>
                :
                <span className="song-number">1</span>
            }
            <h2 className="song-title">{props.song.name}</h2>
            <p className="song-maker">{props.song.user.username}</p>
            <span className="song-likes" id={`like-count-${props.id}`}>{likes}</span>

            <div className="song-options">
                {songBelongsToUser() ? <DeleteAndEditButtons id={props.id} deleteHandler={props.deleteHandler}/> : null}
                    {userLikesSong ? 
                        <FontAwesomeIcon icon={solid("thumbs-up")} className='like-button font-awesome' onClick={e => likeHandler(e, props.id)}/>
                        :
                        <FontAwesomeIcon icon={regular("thumbs-up")} className='like-button font-awesome' onClick={e => likeHandler(e, props.id)}/>
                    }
            </div>
        </div>
        
    )

}

const mapStateToProps = state => {
    const sounds = state.sounds
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
 
export default connect(mapStateToProps, { setCurrentSong, setNowPlaying, endNowPlaying, fetchSongs })(Song)