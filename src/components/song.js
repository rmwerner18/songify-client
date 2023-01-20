import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DeleteAndEditButtons from './delete_and_edit_buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import SongPlayButton from './song_play_button' 
import SongOptionsContainer from '../containers/song_options_container'


const Song = ({ id, idx, deleteHandler, likeHandler, song }) => { 

    const user = useSelector(state => state.user)
    const like = song.likes.find(like => like.user_id === user.id)
    const [userLikesSong, setUserLikesSong] = useState(null)
    const [likes, setLikes] = useState(song.likes.length)
    const [mouseOver, setMouseOver] = useState(false)

    useEffect(() => {
        setUserLikesSong(!!like)
    }, [like])

    const songLikeHandler = (e, id) => {
        userLikesSong ? setLikes(likes - 1) : setLikes(likes + 1)
        setUserLikesSong(!userLikesSong)
        likeHandler(e, id)
    }

    const songBelongsToUser = () => song.user.id === user.id && user.id

    return (

        <div
            className={mouseOver ? "song-box active" : "song-box"}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <div className='song-number'>
                <SongPlayButton id={id} mouseOver={mouseOver} idx={idx}/>
            </div>
            <h2 className="song-title">{song.name}</h2>
            <p className="song-maker">{song.user.username}</p>
            <span className="song-likes" id={`like-count-${id}`}>{likes}</span>
            <SongOptionsContainer 
                id={id} 
                deleteHandler={deleteHandler}
                song={song}
                likeHandler={songLikeHandler}
                user={user}
                userLikesSong={userLikesSong}
            />
            {/* <div className="song-options">

                {songBelongsToUser() ? <DeleteAndEditButtons id={id} deleteHandler={deleteHandler}/> : null}
                    {userLikesSong ? 
                        <FontAwesomeIcon icon={solid("thumbs-up")} className='like-button font-awesome' onClick={e => songLikeHandler(e, id)}/>
                        :
                        <FontAwesomeIcon icon={regular("thumbs-up")} className='like-button font-awesome' onClick={e => songLikeHandler(e, id)}/>
                    }
            </div> */}
        </div>
    )
}
 
export default Song