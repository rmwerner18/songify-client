import React, { useState } from 'react';
// import ChordForm from './chord_form'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { notes, trebleNotes, bassNotes } from '../notes'
import { chordQualityAbbreviations, chordQualityFullNames } from '../chord_qualities'


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
        return notes.map(note => {
            return <option 
                value={note} 
                selected={props.chords[props.id].formattedName === note ? true : false}
                >{note}</option>
        })
    }


    const chordQualityOptions = () => {
        return chordQualityAbbreviations.map(qual => {
            return <option 
                value={qual} 
                selected={props.chords[props.id].formattedQuality === qual ? true : false}
                >{qual}</option>
        })
    }

    const chordBassOptions = () => {
        return notes.map(note => {
            return <option 
                value={note} 
                selected={props.chords[props.id].formattedBass === note ? true : false}
                >{note}</option>
        })
    }

    const toggleCheck = () => setEditMode(!editMode)

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
                    <FontAwesomeIcon icon={solid('check')} className="font-awesome" onClick={toggleCheck}/>
                </div>
                :
                <>
                    <FontAwesomeIcon icon={solid("pen-to-square")} className="font-awesome" onClick={toggleCheck}/>
                    <span className="chord-name">
                        {chordAndQuality()} {bassExists() ? bass() : null}
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