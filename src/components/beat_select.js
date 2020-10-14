import React from 'react'
import drumPresets from '../drum_presets'

const options = () => {
    return drumPresets.map((preset, index) => <option value={preset}></option>)
}


const BeatSelect = (props) => {
    return (
        <>
            <label for="drum-preset">Choose your browser from the list:</label>
            <select list={list()} name="drum-preset" id="drum-preset"></select>
            <datalist id='drum-preset-select' onChange={props.changeHandler}>
                <option value='no preset'/>
                {options()}
            </datalist>
        </>
    )
}

export default BeatSelect