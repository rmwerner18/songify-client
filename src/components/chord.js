import React from 'react';
import * as Tone from 'tone'
import ChordForm from './chord_form'

var Octavian = require('octavian')


const Chord = (props) => {
    let clickHandler = () => {
        document.getElementById('chord-form-modal').style.display = "block"
    }

    let closeHandler = () => {
        document.getElementById('chord-form-modal').style.display = "none"

    }

    console.log(props.chord)
    return (
        <>
        <div id="chord-form-modal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={closeHandler}>&times;</span>
                <p>{<ChordForm id={props.id} chord={props.chord} submitHandler={props.submitHandler} />}</p>
            </div>
        </div>
        <div className="chord-box" onClick={clickHandler}>
            <span>
                {props.chord.name}{props.chord.quality}/{props.chord.bass}
            </span>
        </div>
        </>
    )
}

export default Chord