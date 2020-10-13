import React from 'react'
import drumPresets from '../drum_presets'

const options = () => {
    return drumPresets.map((preset, index) => <option value={index}>Drum Preset {index + 1}</option>)
}

const BeatSelect = (props) => {
    return (
        <select onChange={props.changeHandler}>
            <option value='no preset'>Select a Beat</option>
            {options()}
        </select>
    )
}

export default BeatSelect