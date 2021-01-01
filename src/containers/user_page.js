import React from 'react'
import SongsContainer from './songs_container'

const UserPage = (props) => {
    return (
        <div className="user-page">
            <SongsContainer state={props.state} editHandler={props.editHandler} usersSongs={true}/>
            <SongsContainer state={props.state} editHandler={props.editHandler} favoritedSongs={true}/>
        </div>
    )
        

}

export default UserPage