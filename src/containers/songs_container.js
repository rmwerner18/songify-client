import React from 'react'

class SongsContainer extends React.Component {
    songs = []

    

    renderSongs = (songs) => {
        songs.forEach(song => {

        })
    }

    fetchSongs = () => {
        return fetch('http://localhost:3000/songs')
        .then(resp => resp.json())
        .then(console.log)
    }

    render() {
        return this.fetchSongs()
    }
}

export default SongsContainer