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
            console.log("song!:", song)
            return (<Song song={song} player={this.props.player} playHandler={this.props.playHandler} deleteHandler={this.deleteHandler} editHandler={this.editHandler}/>)
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

    componentDidMount = () => {
        fetch('http://localhost:3000/songs')
        .then(resp => resp.json())
        .then(songs => {
            this.renderSongs(songs)
            this.setState({loaded: true, songs: songs})
        })
    }

    render() {
        return (
            this.state.loaded 
            ?
            <div className="songs-container">
                <h1>ALL SONGS</h1>
                {this.renderSongs()}
            </div>
            :
            "loadingSongs"
        )
    }
}

export default SongsContainer