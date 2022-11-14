import React, { useState } from 'react';
// import ChordForm from './chord_form'
import { connect } from 'react-redux'
import { changeSingleChord } from '../actions/change_single_chord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { MID_NOTES, BASS_NOTES } from '../constants/notes'
import { CHORD_QUALITIES } from '../constants/chord_qualities'
import { useDispatch } from 'react-redux';


// var Octavian = require('octavian')


const Chord = props => {
    const dispatch = useDispatch()

    // const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const chord = props.chords[props.id]
    const [bass, setBass] = useState(chord.bass)
    const [name, setName] = useState(chord.name)
    const [quality, setQuality] = useState(chord.quality)

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
                selected={chord.name === noteValue ? true : false}
                >{MID_NOTES[noteValue]}</option>
        })
    }


    const chordQualityOptions = () => {
        return Object.keys(CHORD_QUALITIES).map(qual => {
            return <option 
                value={qual} 
                selected={chord.quality === qual ? true : false}
                >{CHORD_QUALITIES[qual]}</option>
        })
    }

    const chordBassOptions = () => {
        return Object.keys(BASS_NOTES).map(noteValue => {
            return <option 
                value={noteValue} 
                selected={chord.bass === noteValue ? true : false}
                >{BASS_NOTES[noteValue]}</option>
        })
    }

    const toggleEditMode = () => setEditMode(!editMode)

    const displayChord = () => {
        return MID_NOTES[chord.name] + CHORD_QUALITIES[chord.quality] + "/" + BASS_NOTES[chord.bass]
    }

    const submitChange = () => {
        dispatch(changeSingleChord(props.id, {bass: bass, name: name, quality: quality}))
        toggleEditMode()
    }

    return (
        <>
            {/* {modalIsOpen ? modal() : null} */}
            <div className="chord-box">
                {editMode ?
                <div className='chord-edit-selects'>
                    <select className='chord-name-select' onChange={e => setName(e.target.value)}>
                        {chordNameOptions()}
                    </select>
                    <select className='chord-quality-select' onChange={e => setQuality(e.target.value)}>
                        {chordQualityOptions()}
                    </select>
                    <span>/</span>
                    <select className='chord-bass-select' onChange={e => setBass(e.target.value)}>
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