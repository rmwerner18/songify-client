import React from 'react'
import { NavLink } from 'react-router-dom'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { endNowPlaying } from '../actions/end_now_playing'
import { useDispatch } from 'react-redux'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 

const DeleteAndEditButtons = props => {
    
    const dispatch = useDispatch()
    const editHandler = () => {
        stopLoop()
        dispatch(endNowPlaying())
    }

    return (
        <>
            <FontAwesomeIcon icon={solid("trash-can")} className="font-awesome" onClick={() => props.deleteHandler(props)} />
            <NavLink to={`/songs/${props.id}/edit`}>
                <FontAwesomeIcon icon={solid("pen-to-square")} className="font-awesome" onClick={editHandler} />
            </NavLink>
        </>
    )
}

export default DeleteAndEditButtons