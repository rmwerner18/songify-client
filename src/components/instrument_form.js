import React from 'react'

const InstrumentForm = (props) => {
    return (
        <>
            <select onChange={props.changeHandler}>
                <option value="synth">Synth</option>
                <option value="piano">Piano</option>
            </select>
        </>
    )
}


export default InstrumentForm