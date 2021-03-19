import React from 'react'
import { NavLink } from 'react-router-dom'
import { stopLoop } from '../helper_functions.js/stop_loop'

const DeleteAndEditButtons = props => {
    return (
        <>
            <button onClick={() => props.deleteHandler(props)}>Delete</button>
            <NavLink to={`/songs/${props.id}/edit`}>
                <button onClick={stopLoop}>Edit</button>
            </NavLink>
        </>
    )
}

export default DeleteAndEditButtons