import React from 'react'
import BeatSelect from './beat_select'
import drumPresets from '../drum_presets'
import { changeHHBeats, changeSnareBeats, changeKickBeats } from '../actions/change_drums'
import { clearDrums } from '../actions/clear_drums'
import { connect } from 'react-redux'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
import { makeBeatArray } from '../helper_functions.js/make_beat_array'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'

const BeatForm = (props) => {

    const presetChangeHandler = (e) => {
        if (e.target.value !== 'no preset') {
            let beat = drumPresets[e.target.value]
            props.changeHHBeats(beat.hhBeats) 
            props.changeSnareBeats(beat.snareBeats)
            props.changeKickBeats(beat.kickBeats)
        }
    }

    const changeHandler = (e) => {
        if (e.target.matches('.drum-preset-select')) {
            presetChangeHandler(e)
        } else {
            let newArray
            let id = e.target.id
            if (e.target.name === 'hhBeats') {
                newArray = props.hhBeats
                addOrRemoveBeat(newArray, id)
                props.changeHHBeats(newArray)
            } else if (e.target.name === 'snareBeats') {
                newArray = props.snareBeats
                addOrRemoveBeat(newArray, id)
                props.changeSnareBeats(newArray)
            } else if (e.target.name === 'kickBeats') {
                newArray = props.kickBeats
                addOrRemoveBeat(newArray, id)
                props.changeKickBeats(newArray)
            } 
        }
    }

    const makeHHRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <label className={`checkbox-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={props.hhBeats.includes(n)} name="hhBeats" id={n} onChange={(e) => changeHandler(e, props.hhBeats)}/>
            <div className='checkmark'></div>
        </label>
    )})}

    const makeSnareRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <label className={`checkbox-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={props.snareBeats.includes(n)} name="snareBeats" id={n} onChange={(e) => changeHandler(e, props.snareBeats)}/>
            <div className='checkmark'></div>
        </label>
    )})}

    const makeKickRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <label className={`checkbox-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={props.kickBeats.includes(n)} name="kickBeats" id={n} onChange={(e) => changeHandler(e, props.kickBeats)}/>
            <div className='checkmark'></div>
        </label>
    )})}
    
    return(
        <div className='beat-form'>
            <div className="beat-container">
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
            <div className='beat-options'>
                <BeatSelect changeHandler={e => changeHandler(e)} />
                <button onClick={props.clearDrums}>Clear Drums</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    changeHHBeats,
    changeSnareBeats,
    changeKickBeats,
    clearDrums
}

const mapStateToProps = (state) => {
    return {
        hhBeats: state.currentSong.hhBeats,
        snareBeats: state.currentSong.snareBeats,
        kickBeats: state.currentSong.kickBeats
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeatForm)