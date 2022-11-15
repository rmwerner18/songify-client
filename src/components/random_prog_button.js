import React from 'react'
import { changeAllChords } from '../actions/change_all_chords'
import CHORD_PROG_PRESETS from '../constants/chord_prog_presets'
import { connect } from 'react-redux'

const RandomProgButton = (props) => {
    const randomProgGenerator = () => {
        let max = CHORD_PROG_PRESETS.length
        let int =  Math.floor(Math.random() * Math.floor(max));
        props.changeAllChords(CHORD_PROG_PRESETS[int])
    }
    
    return (
        <div className='random-chords-button-container'>
            <button className='random-chords-button button' onClick={randomProgGenerator}>Randomize Chords</button>
        </div>
    )
}

export default connect(null, { changeAllChords })(RandomProgButton)