import React from 'react'
import { useDispatch } from 'react-redux'
import { changeKickBeats, changeHHBeats, changeSnareBeats } from '../actions/change_drums'
import drumPresets from '../drum_presets'

const BeatSelect = () => {   
    const dispatch = useDispatch()

    const changeHandler = (e) => {
        if (e.target.value === 'no preset') {
            dispatch(changeHHBeats([]))
            dispatch(changeSnareBeats([]))
            dispatch(changeKickBeats([]))
        } else {
            let beat = drumPresets[e.target.value]
            dispatch(changeHHBeats(beat.hhBeats))
            dispatch(changeSnareBeats(beat.snareBeats))
            dispatch(changeKickBeats(beat.kickBeats))
        }
    }
    
    const options = () => {
        return drumPresets.map((preset, index) => {
            return <option key={ index } value={ index }>Drum Preset { index + 1 }</option>
        })
    }
    
    return (
        <select className='drum-preset-select' onChange={ e => changeHandler(e) }>
            <option value='no preset'>Select a Beat</option>
            <option value='no preset'>None</option>
            { options() }
        </select>
    )
}

export default BeatSelect