import React from 'react'
import BeatSelect from './beat_select'
import DRUM_PRESETS from '../constants/drum_presets'
import { changeSongAttribute } from '../actions/change_song_attribute'
import { useSelector, useDispatch } from 'react-redux'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
import { makeBeatArray } from '../helper_functions.js/make_beat_array'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'
import { useEffect } from 'react'

const BeatForm = () => {

    const currentSong = useSelector(state => state.currentSong)
    const hhBeats = currentSong.hhBeats
    const snareBeats = currentSong.snareBeats
    const kickBeats = currentSong.kickBeats
    
    const beatTypes = {
        'hhBeats': hhBeats,
        'snareBeats': snareBeats,
        'kickBeats': kickBeats
    }

    const dispatch = useDispatch()   

    const changeHandler = (e) => {
        const { name: beatType, id } = e.target
        const newArray = addOrRemoveBeat(beatTypes[beatType], id)
        dispatch(changeSongAttribute({beatType: newArray}))
    }

    const makeHHRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div key={index} className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input type="checkbox" checked={hhBeats.includes(n)} name="hhBeats" id={n} onChange={(e) => changeHandler(e)}/>
                <div className='checkmark'></div>
            </label>
        </div>
    )})}

    const makeSnareRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div key={index} className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input type="checkbox" checked={snareBeats.includes(n)} name="snareBeats" id={n} onChange={(e) => changeHandler(e, snareBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
    )})}

    const makeKickRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div key={index} className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input type="checkbox" checked={kickBeats.includes(n)} name="kickBeats" id={n} onChange={(e) => changeHandler(e, kickBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
    )})}
    
    return(
        <div className='beat-form'>
            <div className="beat-container">
                <div className='beat-labels'>
                    <p>hi-hat</p>
                    <p>snare</p>
                    <p>kick</p>
                </div>
                <div>
                    <div className='checkbox-row'>   
                        {makeHHRows()}
                    </div>
                    <div className='checkbox-row'>
                        {makeSnareRows()}
                    </div>
                    <div className='checkbox-row'>
                        {makeKickRows()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeatForm