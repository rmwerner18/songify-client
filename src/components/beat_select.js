import React from 'react'
import { useDispatch } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute'
import DRUM_PRESETS from '../constants/drum_presets'

const BeatSelect = () => {   
    const dispatch = useDispatch()

    const changeHandler = (e) => {
        if (e.target.value === 'no preset') {
            dispatch(changeSongAttribute({hhBeats: [], kickBeats: [], snareBeats: []}))
        } else {
            let beat = DRUM_PRESETS[e.target.value]
            dispatch(changeSongAttribute({hhBeats: beat.hhBeats, kickBeats: beat.kickBeats, snareBeats: beat.snareBeats}))
        }
    }

    const options = () => {
        return DRUM_PRESETS.map((preset, index) => {
            return <option key={ index } value={ index }>Drum Preset { index + 1 }</option>
        })
    }
    
    return (
        <select className='drum-preset-select' onChange={ e => changeHandler(e) }>
            <option value='no preset'>Select Drums</option>
            <option value='no preset'>None</option>
            { options() }
        </select>
    )
}

export default BeatSelect