import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { changeSingleChord } from '../actions/change_single_chord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 
import { MID_NOTES, BASS_NOTES } from '../constants/notes'
import { CHORD_QUALITIES } from '../constants/chord_qualities'
import { useDispatch } from 'react-redux';

const Chord = props => {
    const { id } = props
    const chord = useSelector(state => state.currentSong.chords[id])
    const currentBeat = useSelector(state => state.currentBeat)

    const [editMode, setEditMode] = useState(false)
    const [bass, setBass] = useState(chord.bass)
    const [name, setName] = useState(chord.name)
    const [quality, setQuality] = useState(chord.quality)

    const dispatch = useDispatch()

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
        dispatch(changeSingleChord(id, {bass: bass, name: name, quality: quality}))
        toggleEditMode()
    }

    const chordIsPlaying = () => {
        const barMax = 8*(id+1)
        const barMin = 8*id
        if (currentBeat === -1) {
            return false
        }
        if (currentBeat >= barMin && currentBeat < barMax) {
            return true
        }
        return false
    }

    return (
        <>
            <div className='chord-box'
            // {chordIsPlaying() ? 'chord-box playing' : 'chord-box'}
            >
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
                    <span className="chord-name">
                        {displayChord()}
                    </span>
                    <FontAwesomeIcon icon={solid("pen-to-square")} className="font-awesome" onClick={toggleEditMode}/>
                </>}
            </div>
        </>
    )
}

export default Chord