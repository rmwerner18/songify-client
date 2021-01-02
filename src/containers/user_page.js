import React from 'react'
import SongsContainer from './songs_container'

const UserPage = (props) => {
    return (
        <div className="user-page">
            <SongsContainer editHandler={props.editHandler} usersSongs={true}/>
            <SongsContainer editHandler={props.editHandler} favoritedSongs={true}/>
        </div>
    )
        

}

export default UserPage