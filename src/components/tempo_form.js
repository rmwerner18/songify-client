import React from 'react';

const TempoForm = (props) => {
    return (
        <div className='tempo-form'>
            <p className="bpm-meter">bpm: {props.bpm}</p>
            <input type="range" min="30" max='300' value={props.bpm} onChange={(e) => props.changeHandler(e.target.value)}/>
        </div>
    )
}

export default TempoForm
