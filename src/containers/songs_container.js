import React from 'react'
import Song from '../components/song'
import { connect } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'
import { hideNavbar } from '../actions/hide_navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 


class SongsContainer extends React.Component {

    renderSongs = (songs = this.props.songs) => {
        // songs = this.applySearch(this.filterSongs(songs))
        return songs.map(song => {
            return (<Song 
                id={song.id}
                key={song.id}
                song={song}
                deleteHandler={this.deleteHandler}
                likeHandler={this.likeHandler}
            />)
        })
    }

    applySearch = (songs) => {
        if (this.props.searchInput) {
            return songs.filter(song => {
                let formattedName = song.name.toLowerCase()
                let formattedUsername = song.user.username.toLowerCase()
                return formattedName.includes(this.props.searchInput.toLowerCase()) || formattedUsername.includes(this.props.searchInput.toLowerCase())
            })
        }
        return songs
    }

    deleteSong = song => {
        return fetch(`http://localhost:3000/songs/${song.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(this.props.fetchSongs)
    }

    deleteHandler = (song) => {
        let newArray = this.props.songs
        let i = newArray.findIndex(s => s.id === song.id)
        newArray.splice(i, 1)
        this.setState({songs: newArray})
        this.deleteSong(song)
    }

    componentDidMount = () => {
        this.props.fetchSongs()
    }

    userLikesSong = song => {
        if(song.likes) {
            return song.likes.find(like => like.user_id === this.props.user.id)
        }
        return false
    }

    deleteLike = like => {
        return fetch(`http://localhost:3000/likes/${like.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(resp => resp.json())
        .then(this.props.fetchSongs)
    }

    createLike = song => {
        return  fetch('http://localhost:3000/likes/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                song_id: song.id,
                user_id: this.props.user.id
            })
        }).then(resp => resp.json())
        .then(this.props.fetchSongs)
    }

    likeHandler = (e, id) => {
        const song = this.props.songs.find(song => song.id === id)
        if (this.props.user.id) {
            console.log(song)
            if (this.userLikesSong(song)) {
                this.deleteLike(this.userLikesSong(song))
            } else {
                this.createLike(song)
            }
        } 
    }

    render() {
        return (
            this.props.songs.length > 0
            ?
            <div className="songs-container">
                <div className="songs-container-header">
                    <span className="songs-container-header-col icon">
                        <FontAwesomeIcon icon={solid('hashtag')} className='font-awesome' />
                    </span>
                    <span className="songs-container-header-col song-title">SONG TITLE</span>
                    <span className="songs-container-header-col artist">ARTIST</span>
                    <span className="songs-container-header-col likes">LIKES</span>
                </div>
                {this.renderSongs()}
            </div>
            :
            <span>
                loading songs
            </span>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        songs: state.allSongs
    }
}

export default connect(null, { fetchSongs, hideNavbar })(SongsContainer)