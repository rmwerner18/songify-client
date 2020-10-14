import React from 'react';

const TempoForm = (props) => {
    return (
        <>
            <input type="range" min="30" max='300' value={props.bpm} onChange={(e) => props.changeHandler(e.target.value)}/>
            <p className="bpm-meter">bpm: {props.bpm}</p>
        </>
    )
}

export default TempoForm
