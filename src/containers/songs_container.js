import React, { useState, useEffect } from 'react'
import Song from '../components/song'
import { connect, useSelector } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'
import { hideNavbar } from '../actions/hide_navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../components/search_bar'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 


const SongsContainer = props => {
    let [searchInput, setSearchInput] = useState('')
    let [songs, setSongs] = useState(props.songs)
    const user = useSelector(state => state.user)


    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    // console.log('render songsContainer')

    const renderSongs = (songs = props.songs) => {
        // console.log(songs)
        songs = applySearch(songs)
        return songs.map(song => {
            // console.log(song.id)
            return (<Song 
                id={song.id}
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
        .then(props.fetchSongs)
    }

    const deleteHandler = (song) => {
        let newArray = props.songs
        let i = newArray.findIndex(s => s.id === song.id)
        newArray.splice(i, 1)
        setSongs(newArray)
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
        .then(props.fetchSongs)
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
                user_id: props.user.id
            })
        }).then(resp => resp.json())
        .then(props.fetchSongs)
    }

    const likeHandler = (e, id) => {
        // console.log('run likeHandler in songscontainer')
        const song = props.songs.find(song => song.id === id)
        // console.log(song)
        // console.log(props)
        if (props.user.id) {
            userLikesSong(song)
            if (userLikesSong(song)) {
                deleteLike(userLikesSong(song))
            } else {
                createLike(song)
            }
        } 
    }

    return (
        props.songs.length > 0
        ?
        <div className="songs-container">
            <div className="songs-container-header">
                <span className="songs-container-header-col icon">
                    <FontAwesomeIcon icon={solid('hashtag')} className='font-awesome' />
                </span>
                <span className="songs-container-header-col song-title">SONG TITLE</span>
                <span className="songs-container-header-col artist">ARTIST</span>
                <span className="songs-container-header-col likes">LIKES</span>
                <SearchBar searchInput={searchInput} handleSearch={handleSearch}/>
            </div>
            {renderSongs()}
        </div>
        :
        <span>
            loading songs
        </span>
    )

}

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         songs: state.allSongs
//     }
// }

export default connect(null, { fetchSongs, hideNavbar })(SongsContainer)