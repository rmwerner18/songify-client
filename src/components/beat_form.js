import React from 'react'
import BeatSelect from './beat_select'
import DRUM_PRESETS from '../constants/drum_presets'
// import { changeHHBeats, changeSnareBeats, changeKickBeats } from '../actions/change_drums'
import { changeSongAttribute } from '../actions/change_song_attribute'
import { clearDrums } from '../actions/clear_drums'
import { useSelector, useDispatch } from 'react-redux'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
import { makeBeatArray } from '../helper_functions.js/make_beat_array'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'
import { useEffect } from 'react'

const BeatForm = () => {
    console.log('render beat form')

    const hhBeats = useSelector(state => state.currentSong.hhBeats)
    const currentSong = useSelector(state => state.currentSong)
    const snareBeats = useSelector(state => state.currentSong.snareBeats)
    const kickBeats = useSelector(state => state.currentSong.kickBeats)
    
    const beatTypes = {
        'hhBeats': hhBeats,
        'snareBeats': snareBeats,
        'kickBeats': kickBeats
    }
    
    useEffect(() => {
        console.log(hhBeats)
    }, [hhBeats])
    
    console.log(currentSong)


    const dispatch = useDispatch()   


    const changeHandler = (e) => {
        const { name: beatType, id } = e.target
        const newArray = addOrRemoveBeat(beatTypes[beatType], id)
        dispatch(changeSongAttribute({beatType: newArray}))
    }

    const makeHHRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={hhBeats.includes(n)} name="hhBeats" id={n} onChange={(e) => changeHandler(e)}/>
                <div className='checkmark'></div>
            </label>
        </div>
    )})}

    const makeSnareRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={snareBeats.includes(n)} name="snareBeats" id={n} onChange={(e) => changeHandler(e, snareBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
    )})}

    const makeKickRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={kickBeats.includes(n)} name="kickBeats" id={n} onChange={(e) => changeHandler(e, kickBeats)}/>
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