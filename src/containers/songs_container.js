import React, { useState } from 'react'
import Song from '../components/song'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../components/search_bar'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { stopLoop } from '../helper_functions.js/stop_loop'


const SongsContainer = ({ songs, user, page}) => {
    let [searchInput, setSearchInput] = useState('')
    const nowPlaying = useSelector(state => state.nowPlaying)
    const dispatch = useDispatch()
    

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    const renderSongs = () => {
        return applySearch(songs).map((song, index) => {
            return (<Song 
                id={song.id}
                idx={index}
                key={song.id}
                song={song}
                deleteHandler={deleteHandler}
                likeHandler={likeHandler}
            />)
        })
    }

    const applySearch = (songs) => {
        if (searchInput) {
            return songs.filter(song => {
                let formattedName = song.name.toLowerCase()
                let formattedUsername = song.user.username.toLowerCase()
                return formattedName.includes(searchInput.toLowerCase()) || formattedUsername.includes(searchInput.toLowerCase())
            })
        }
        return songs
    }

    const deleteSong = song => {
            return fetch(`http://localhost:3000/songs/${song.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => dispatch(fetchSongs()))
    }

    const deleteHandler = (song) => {
        if (nowPlaying.song && nowPlaying.song.id === song.id) {
            stopLoop()
        }
        deleteSong(song)
    }

    const userLikesSong = song => {
        return song.likes.find(like => like.user_id === user.id)
    }

    const deleteLike = like => {
        return fetch(`http://localhost:3000/likes/${like.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(resp => resp.json())
        .then(() => dispatch(fetchSongs()))
    }

    const createLike = song => {
        return  fetch('http://localhost:3000/likes/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                song_id: song.id,
                user_id: user.id
            })
        }).then(resp => resp.json())
        .then(() => dispatch(fetchSongs()))
    }

    const likeHandler = (e, id) => {
        const song = songs.find(song => song.id === id)
        if (user.id) {
            userLikesSong(song)
            if (userLikesSong(song)) {
                deleteLike(userLikesSong(song))
            } else {
                createLike(song)
            }
        } 
    }

    const renderNoSongsMessage = () => {
        switch(page) {
            case 'USER_SONGS':
                return (
                    <>
                        <h1>You have not created any songs.</h1>
                        <span>Click the 'Create' tab to create a new song.</span>
                    </>
                )
            case 'LIKED_SONGS':
                return (
                    <>
                        <h1>You have not liked any songs.</h1>
                        <span>Click the like icon on a song to see it appear here</span>
                    </>
                )
            default:
                return (
                    <>
                        <h1>No songs have been created</h1>
                        <span>Click the 'Create' tab to create a new song.</span>
                    </>
                )
        }
    }

    return (
        <div className="songs-container">
            <div className="songs-container-header">
                <span className="songs-container-header-col icon">
                    <FontAwesomeIcon icon={solid('hashtag')} className='font-awesome' />
                </span>
                <span className="songs-container-header-col song-title">SONG TITLE</span>
                <span className="songs-container-header-col artist">ARTIST</span>
                <span className="songs-container-header-col likes">LIKES</span>
                <SearchBar className='songs-container-header-col search' searchInput={searchInput} handleSearch={handleSearch}/>
            </div>
            {renderSongs()}
        </div>
    )
}

export default SongsContainer