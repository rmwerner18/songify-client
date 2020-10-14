import React from 'react'
import { NavLink } from 'react-router-dom'
import Grid from '../containers/grid'

const Song = (props) => {

    const showModal = () => {
        document.getElementById(`chord-edit-modal-${props.song.id}`).style.display = 'block'
    }

    const closeHandler = () => {
        document.getElementById(`chord-edit-modal-${props.song.id}`).style.display = 'none'
    }

    return (
        <>
            {/* <div id={`chord-edit-modal-${props.song.id}`} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeHandler}>&times;</span>
                    <div>
                        {<Grid player={props.player} playHandler={props.playHandler} song={props.song}/>}
                    </div>
                </div>
            </div> */}
            <div className="song-box">
                <button onClick={(e) => props.playHandler(e, props.song)}>Start</button>
                <button onClick={() => props.deleteHandler(props.song)}>Delete</button>
                <NavLink to={`/songs/${props.song.id}/edit`}>
                    <button>Edit</button>
                </NavLink>
            </div>
        </>
    )

}
 
export default Song