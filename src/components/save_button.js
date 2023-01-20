import React, { useState } from 'react'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { endNowPlaying } from '../actions/end_now_playing'
import SongNameForm from '../components/song_name_form'
import { fetchHeaders } from '../constants/fetch_headers'
import { connect } from 'react-redux'
import BASE_API_URL from '../constants/base_api_url'

const SaveButton = props => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const saveEdit = async newObj => {
        const fetchConfig = {
            method: "PATCH",
            headers: fetchHeaders,
            body: JSON.stringify(
                newObj
            )
        }
        const response = await fetch(BASE_API_URL + `songs/${props.song_id}`, fetchConfig)
        const result = await response.json()
        stopLoop()
        props.endNowPlaying()
        // check response object in back end
        if (result.message !== 'Please log in') {
            alert('Your changes have been saved!')
        } else alert(result.message)
        console.log(result.message)
    }

    const saveSong = newObj => {
        return     fetch(BASE_API_URL + '/songs', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                accepts: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(
                newObj
            )
        }).then(resp => resp.json())
        .then(song => {
            if (song.id) {
                alert("Your song has been saved!")
            }
        }).catch(() => {
            alert('could not save song')
        })
    }

    const saveSongHandler = (e, songname) => {  
        e.preventDefault()
            let newObj
            newObj = props.song
            newObj.user_id = props.user.id
            newObj.name = songname
            props.song_id ? saveEdit(newObj) : saveSong(newObj)
    }

    const openModalOrAlert = () => {
        props.user.id ? setModalIsOpen(true) : alert('Please login to save a song')
    }
    

    const modalClickHandler = () => {
        stopLoop()
        props.endNowPlaying()
        openModalOrAlert()
    }

    const modalCloseHandler = () => {
        setModalIsOpen(false)
    }

    const modal = () => {
        return (
            <div id={`song-name-form-modal`} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={modalCloseHandler}>&times;</span>
                    <div>
                        {<SongNameForm submitHandler={saveSongHandler}/>}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {modalIsOpen ? modal() : null}
            <div className='save-container' >
                <button className='save-button button' onClick={props.song_id ? saveSongHandler : modalClickHandler}>Save</button>
            </div>  
        </>
    )
}

const mapStateToProps = state => {
    return {
        song: state.currentSong,
        user: state.user
    }
}

export default connect(mapStateToProps, { endNowPlaying })(SaveButton)