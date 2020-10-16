import React from 'react'
import { NavLink } from 'react-router-dom'
import Song from '../components/song'


class SongsContainer extends React.Component {
    state = {
        loaded: false,
        songs: [],
    }

    renderSongs = () => {
        return this.state.songs.map(song => {
            return (<Song 
                song={song} 
                state={this.props.state}        
                layer={this.props.player} 
                playHandler={this.props.playHandler} 
                deleteHandler={this.deleteHandler} 
                editHandler={this.editHandler} 
                likeHandler={this.likeHandler}/>)
        })
    }

    deleteHandler = (song) => {
        fetch(`http://localhost:3000/songs/${song.id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
        .then((songs) => {
            this.setState({songs: songs})
        })
    }

    filterSongs = (songs) => {
        let header = "ALL SONGS"
        let filteredSongs = songs
        if (this.props.usersSongs) {
            filteredSongs = songs.filter(song => song.user.id === this.props.state.user.id)
            header = "YOUR SONGS"
        } else if (this.props.favoritedSongs) {
            filteredSongs = songs.filter(song => song.likes.find(like => like.user_id === this.props.state.user.id))
            header = "LIKED SONGS"
        }
        this.setState({loaded: true, songs: filteredSongs, header: header})
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/songs')
        .then(resp => resp.json())
        .then(songs => this.filterSongs(songs))
    }

    likeHandler = (e) => {
        let songId = e.target.id.split('-')[2]
        let song = this.state.songs.find(song => song.id === parseInt(songId))
        if (song.likes.find(like => like.user_id === this.props.state.user.id)) {
            let like = song.likes.find(like => like.user_id === this.props.state.user.id && like.song_id === song.id)
            fetch(`http://localhost:3000/likes/${like.id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    accepts: 'application/json'
                }
            }).then(resp=>resp.json())
            .then(songs => this.filterSongs(songs))
        } else {
            fetch('http://localhost:3000/likes/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    accepts: 'application/json'
                },
                body: JSON.stringify({
                    song_id: song.id,
                    user_id: this.props.state.user.id
                })
            }).then(resp=>resp.json())
            .then(songs => this.filterSongs(songs))
        }
    }

    render() {
        return (
            this.state.loaded 
            ?
            <div className="songs-container">
                <h1>{this.state.header}</h1>
                {this.renderSongs()}
            </div>
            :
            "loadingSongs"
        )
    }
}

export default SongsContainer