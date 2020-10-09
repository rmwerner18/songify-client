import React from 'react';
import ChordForm from './chord_form'


const Chord = (props) => {
    let clickHandler = () => {
        document.getElementById(`chord-form-modal-${props.id}`).style.display = "block"
    }

    let closeHandler = () => {
        document.getElementById(`chord-form-modal-${props.id}`).style.display = "none"

    }

    return (
        <>
        <div id={`chord-form-modal-${props.id}`} className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeHandler}>&times;</span>
                <div>
                    {<ChordForm id={props.id} chord={props.chord} submitHandler={props.submitHandler} />}
                </div>
            </div>
        </div>
        <div className="chord-box" onClick={clickHandler}>
            <span className="chord-name">
                {props.chord.formattedName} {props.chord.formattedQuality} 
                {props.chord.bass.length > 0 ? "/" + props.chord.formattedBass : null}
            </span>
        </div>
        </>
    )
}

export default Chord