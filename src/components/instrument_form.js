import React from 'react'
import { changeInstrument } from '../actions/change_instrument'
import { useSelector, useDispatch } from 'react-redux'

const InstrumentForm = (props) => {
    const instrument = useSelector(state => state.currentSong.instrument)
    const dispatch = useDispatch()

    return (
        <div className='instrument-form'>
            <span>Instrument: </span>
            <select onChange={e => dispatch(changeInstrument(e.target.value))}>
                <option selected={instrument==='piano' ? true : false} value="piano">Piano</option>
                <option selected={instrument==='synth' ? true : false} value="synth">Synth</option>
            </select>
        </div>
    )
}

export default InstrumentForm