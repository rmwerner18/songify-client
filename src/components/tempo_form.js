import React from 'react';
import { changeTempo } from '../actions/change_tempo'
import { connect } from 'react-redux'

const TempoForm = (props) => {
    return (
        <div className='tempo-form'>
            <p className="bpm-meter">bpm: {props.bpm}</p>
            <input type="range" min="30" max='300' value={props.bpm} onChange={(e) => props.changeTempo(e.target.value)}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        bpm: state.currentSong.bpm
    }
}

export default connect(mapStateToProps, { changeTempo })(TempoForm)
