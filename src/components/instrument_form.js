import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute'

const InstrumentForm = () => {
    const instrument = useSelector(state => state.currentSong.instrument)
    const dispatch = useDispatch()

    return (
        <div className='instrument-form'>
            <span>Instrument: </span>
            <select onChange={e => dispatch(changeSongAttribute({instrument: e.target.value}))}>
                <option selected={instrument==='piano' ? true : false} value="piano">Piano</option>
                <option selected={instrument==='synth' ? true : false} value="synth">Synth</option>
            </select>
        </div>
    )
}

export default InstrumentForm