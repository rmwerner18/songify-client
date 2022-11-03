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
                userPage={this.props.favoritedSongs}
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

    // filterSongs = (songs) => {
    //     if (this.props.usersSongs) {
    //         songs = songs.filter(song => song.user.id === this.props.user.id)
    //     } 
    //     if (this.props.favoritedSongs) {
    //         songs = songs.filter(song => song.likes.find(like => like.user_id === this.props.user.id))
    //     } 
    //     return songs
    // }


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
        // this.setState({songs: newArray})
        this.deleteSong(song)
    }

    componentDidMount = () => {
        // this.props.hideNavbar()
        this.props.fetchSongs()
    }

    // userLikesSong = song => {
    //     return song.likes.find(like => like.user_id === this.props.user.id)
    // }

    // deleteLike = like => {
    //     return fetch(`http://localhost:3000/likes/${like.id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'content-type': 'application/json',
    //             accepts: 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }).then(resp => resp.json())
    //     .then(this.props.fetchSongs)
    // }

    // createLike = song => {
    //     return  fetch('http://localhost:3000/likes/', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             accepts: 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify({
    //             song_id: song.id,
    //             user_id: this.props.user.id
    //         })
    //     }).then(resp => resp.json())
    //     .then(this.props.fetchSongs)
    // }

    // likeHandler = (e) => {
    //     const songId = e.target.id.split('-')[2] 
    //     const song = this.props.songs.find(song => song.id === parseInt(songId))
    //     if (this.props.user.id) {
    //         if (this.userLikesSong(song)) {
    //             this.deleteLike(this.userLikesSong(song))
    //         } else {
    //             this.createLike(song)
    //         }
    //     } 
    // }

    render() {
        return (
            this.props.songs.length > 0
            ?
            <div className="songs-container">
                {/* <h1>{this.header()}</h1> */}
                <div className="songs-container-header">
                    <span className="songs-container-header-icon">
                        <FontAwesomeIcon icon={solid('hashtag')} className='font-awesome' />
                    </span>
                    <span className="songs-container-header-title">Song Title</span>
                    <span className="songs-container-header-artist">Artist</span>
                    <span className="songs-container-header-likes">Likes</span>
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

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         songs: state.allSongs
//     }
// }

export default connect(null, { fetchSongs, hideNavbar })(SongsContainer)