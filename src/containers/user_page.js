import React from 'react'
import SongsContainer from './songs_container'

const UserPage = () => {
    return (
        <div className="user-page">
            <SongsContainer usersSongs={true}/>
            <SongsContainer favoritedSongs={true}/>
        </div>
    )
}

export default UserPage