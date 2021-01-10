import React, { useState } from 'react';
import ChordForm from './chord_form'
import { connect } from 'react-redux'


const Chord = props => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const clickHandler = () => {
        setModalIsOpen(true)
    }

    const closeHandler = () => {
        setModalIsOpen(false)
    }

    const modal = () => {
        return (
            <div id={`chord-form-modal-${props.id}`} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeHandler}>&times;</span>
                    <div>
                        {<ChordForm id={props.id} chord={props.chord} closeHandler={closeHandler}/>}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {modalIsOpen ?
            modal()
            :
            null
            }
            <div className="chord-box" onClick={clickHandler}>
                <span className="chord-name">
                    {props.chords[props.id].formattedName} {props.chords[props.id].formattedQuality} 
                    {props.chords[props.id].bass.length > 0 ? "/" + props.chords[props.id].formattedBass : null}
                </span>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        chords: state.currentSong.chords
    }
}

export default connect(mapStateToProps)(Chord)