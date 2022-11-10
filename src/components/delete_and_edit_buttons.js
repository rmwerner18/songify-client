import React from 'react'
import { NavLink } from 'react-router-dom'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 

const DeleteAndEditButtons = props => {
    return (
        <>
            <FontAwesomeIcon icon={solid("trash-can")} className="font-awesome" onClick={() => props.deleteHandler(props)} />
            <NavLink to={`/songs/${props.id}/edit`}>
                <FontAwesomeIcon icon={solid("pen-to-square")} className="font-awesome" onClick={stopLoop} />
            </NavLink>
        </>
    )
}

export default DeleteAndEditButtons