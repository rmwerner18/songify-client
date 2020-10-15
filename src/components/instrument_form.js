import React from 'react'

const InstrumentForm = (props) => {
    return (
        <div className='instrument-form'>
            <span>Instrument: </span>
            <select onChange={props.changeHandler}>
                <option value="synth">Synth</option>
                <option value="piano">Piano</option>
            </select>
        </div>
    )
}


export default InstrumentForm