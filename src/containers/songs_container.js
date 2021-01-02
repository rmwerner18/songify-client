import React from 'react'
import Song from '../components/song'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import { fetchSongs } from '../actions/set_all_songs'


class SongsContainer extends React.Component {
    state = {
        loaded: false,
        songs: []
    }

    renderSongs = () => {
        let header = "ALL SONGS"
        let filteredSongs = this.props.songs
        if (this.props.usersSongs) {
            filteredSongs = this.props.songs.filter(song => song.user.id === this.props.user.id)
            header = "YOUR SONGS"
        } else if (this.props.favoritedSongs) {
            filteredSongs = this.props.songs.filter(song => song.likes.find(like => like.user_id === this.props.user.id))
            header = "LIKED SONGS"
        }
        // this.setState({header: header})
        return filteredSongs.map(song => {
            return (<Song 
                id={song.id}
                user_id={song.user_id}
                key={song.id}
                song={song}
                deleteHandler={this.deleteHandler} 
                editHandler={this.editHandler} 
                likeHandler={this.likeHandler}
            />)
        })
    }

    deleteHandler = (song) => {
        let newArray = this.state.songs
        let i = newArray.findIndex(s => s.id === song.id)
        newArray.splice(i, 1)
        this.setState({songs: newArray})
        fetch(`http://localhost:3000/songs/${song.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        // .then(resp => resp.json())
        // .then((songs) => {
        //     this.setState({songs: songs})
        // })
    }

    componentDidMount = () => {
        document.querySelector('.navbar').style.display = 'none'
        this.props.fetchSongs()
    }

    likeHandler = (e) => {
        let songId = e.target.id.split('-')[2]
        let song = this.state.songs.find(song => song.id === parseInt(songId))
        if (this.props.user.id) {
            if (song.likes.find(like => like.user_id === this.props.user.id)) {
                let like = song.likes.find(like => like.user_id === this.props.user.id && like.song_id === song.id)
                fetch(`http://localhost:3000/likes/${like.id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        accepts: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(resp => resp.json())
                .then(songs => this.filterSongs(songs))
            } else {
                fetch('http://localhost:3000/likes/', {
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
                .then(songs => this.filterSongs(songs))
            }
        } 
        // else {
        //     // if (Tone.Transport.)
        //     let elements = document.getElementsByClassName('song-list-start-button')
        //     let array = Array.from(elements)
        //     let item = array.find(el => el.innerText === "Stop")
        //     item.innerText = "Start"
        //     Tone.Transport.stop()
        //     Tone.Transport.cancel()
        //     alert('Please login to save a song')
        // }
    }

    render() {
        console.log(this.props.songs)
        console.log(this.props.user.id)
        return (
            this.props.songs.length > 0
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

const mapStateToProps = state => {
    return {
        user: state.user,
        songs: state.allSongs,
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchSongs })(SongsContainer)