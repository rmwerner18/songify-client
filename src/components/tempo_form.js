import React from 'react';
// import { changeTempo } from '../actions/change_tempo'
import { useDispatch, useSelector } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute';

const TempoForm = () => {
    const dispatch = useDispatch()
    const bpm = useSelector(state => state.currentSong.bpm)
    
    return (
        <div className='tempo-form'>
            <p className='bpm-meter'>bpm: {bpm}</p>
            <input type='range' min='30' max='300' value={bpm} onChange={(e) => dispatch(changeSongAttribute({ bpm: e.target.value }))}/>
        </div>
    )
}

export default TempoForm
