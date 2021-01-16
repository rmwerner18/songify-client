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

    const chordAndQuality = () => {
        return props.chords[props.id].formattedName + props.chords[props.id].formattedQuality
    }

    const bassExists = () => {
        return props.chords[props.id].bass.length > 0
    }

    const bass = () => {
        return "/" + props.chords[props.id].formattedBass
    }

    return (
        <>
            {modalIsOpen ? modal() : null}
            <div className="chord-box" onClick={clickHandler}>
                <span className="chord-name">
                    {chordAndQuality()} {bassExists() ? bass() : null}
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