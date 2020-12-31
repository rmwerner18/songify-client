import React from 'react'
import { changeInstrument } from '../actions/change_instrument'
import { connect } from 'react-redux'

const InstrumentForm = (props) => {
    return (
        <div className='instrument-form'>
            <span>Instrument: </span>
            <select onChange={e => props.changeInstrument(e.target.value)}>
                <option value="synth">Synth</option>
                <option value="piano">Piano</option>
            </select>
        </div>
    )
}

export default connect(null, { changeInstrument })(InstrumentForm)