import React, { useState } from 'react';
// import ChordForm from './chord_form'
import { connect } from 'react-redux'
import { changeSingleChord } from '../actions/change_single_chord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { MID_NOTES, BASS_NOTES } from '../constants/notes'
import { CHORD_QUALITIES } from '../constants/chord_qualities'

// var Octavian = require('octavian')


const Chord = props => {
    // const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    // const clickHandler = () => {
    //     setModalIsOpen(true)
    // }

    // const closeHandler = () => {
    //     setModalIsOpen(false)
    // }

    // const modal = () => {
    //     return (
    //         <div id={`chord-form-modal-${props.id}`} className="modal">
    //             <div className="modal-content">
    //                 <span className="close" onClick={closeHandler}>&times;</span>
    //                 <div> */}
    //                     <ChordForm id={props.id} chord={props.chord} closeHandler={closeHandler}/>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }


    const chordNameOptions = () => {
        return Object.keys(MID_NOTES).map(noteValue => {
            return <option 
                value={noteValue} 
                selected={props.chords[props.id].name === noteValue ? true : false}
                >{MID_NOTES[noteValue]}</option>
        })
    }


    const chordQualityOptions = () => {
        return Object.keys(CHORD_QUALITIES).map(qual => {
            return <option 
                value={qual} 
                selected={props.chords[props.id].quality === qual ? true : false}
                >{CHORD_QUALITIES[qual]}</option>
        })
    }

    const chordBassOptions = () => {
        return Object.keys(BASS_NOTES).map(noteValue => {
            return <option 
                value={noteValue} 
                selected={props.chords[props.id].bass === noteValue ? true : false}
                >{BASS_NOTES[noteValue]}</option>
        })
    }

    const toggleEditMode = () => setEditMode(!editMode)

    const displayChord = () => {
        return MID_NOTES[props.chords[props.id].name] + CHORD_QUALITIES[props.chords[props.id].quality] + "/" + BASS_NOTES[props.chords[props.id].bass]
    }

    const submitChange = () => {
        toggleEditMode()
    }

    return (
        <>
            {/* {modalIsOpen ? modal() : null} */}
            <div className="chord-box">
                {editMode ?
                <div className='chord-edit-selects'>
                    <select className='chord-name-select'>
                        {chordNameOptions()}
                    </select>
                    <select className='chord-quality-select'>
                        {chordQualityOptions()}
                    </select>
                    <span>/</span>
                    <select className='chord-bass-select'>
                        {chordBassOptions()}
                    </select>
                    <FontAwesomeIcon icon={solid('check')} className="font-awesome" onClick={submitChange}/>
                </div>
                :
                <>
                    <FontAwesomeIcon icon={solid("pen-to-square")} className="font-awesome" onClick={toggleEditMode}/>
                    <span className="chord-name">
                        {displayChord()}
                    </span>
                </>}
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