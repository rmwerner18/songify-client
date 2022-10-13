import React from 'react'
import { changeAllChords } from '../actions/change_all_chords'
import chordPresets from '../chord_presets'
import { connect } from 'react-redux'

const RandomProgButton = (props) => {
    const randomProgGenerator = () => {
        let max = chordPresets.length
        let int =  Math.floor(Math.random() * Math.floor(max));
        props.changeAllChords(chordPresets[int])
    }
    
    return (
        <div className='random-chords-button-container'>
            <button className='random-chords-button' onClick={randomProgGenerator}>Randomize Chords</button>
        </div>
    )
}

export default connect(null, { changeAllChords })(RandomProgButton)