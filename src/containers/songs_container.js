import React from 'react'
import Song from '../components/song'
import { connect } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'
import { hideNavbar } from '../actions/hide_navbar'


class SongsContainer extends React.Component {

    renderSongs = (songs = this.props.songs) => {
        console.log(songs)
        let filteredSongs = songs
        if (this.props.usersSongs) {
            filteredSongs = songs.filter(song => song.user.id === this.props.user.id)
        } else if (this.props.favoritedSongs) {
            filteredSongs = songs.filter(song => song.likes.find(like => like.user_id === this.props.user.id))
        }
        return filteredSongs.map(song => {
            return (<Song 
                id={song.id}
                key={song.id}
                song={song}
                deleteHandler={this.deleteHandler}
                likeHandler={this.likeHandler}
            />)
        })
    }

    header = () => {
        if (this.props.usersSongs) {
            return "YOUR SONGS"
        } else if (this.props.favoritedSongs) {
            return "LIKED SONGS"
        } else return "ALL SONGS"
    }

    deleteSong = song => {
        return fetch(`http://localhost:3000/songs/${song.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    deleteHandler = (song) => {
        let newArray = this.props.songs
        let i = newArray.findIndex(s => s.id === song.id)
        newArray.splice(i, 1)
        this.setState({songs: newArray})
        this.deleteSong(song)
    }

    componentDidMount = () => {
        this.props.hideNavbar()
        this.props.fetchSongs()
    }

    userLikesSong = song => {
        return song.likes.find(like => like.user_id === this.props.user.id)
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
        .then(songs => this.props.fetchSongs())
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
        .then(songs => this.props.fetchSongs())
    }

    likeHandler = (e) => {
        let songId = e.target.id.split('-')[2]
        let song = this.props.songs.find(song => song.id === parseInt(songId))
        if (this.props.user.id) {
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
                <h1>{this.header()}</h1>
                {this.renderSongs()}
            </div>
            :
            "loadingSongs"
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        songs: state.allSongs,
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchSongs, hideNavbar })(SongsContainer)