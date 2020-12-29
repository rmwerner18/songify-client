import React from 'react'
import BeatSelect from './beat_select'
import drumPresets from '../drum_presets'
import { changeHHBeats } from '../actions/change_hh_beats'
import { changeSnareBeats } from '../actions/change_snare_beats'
import { changeKickBeats } from '../actions/change_kick_beats'
import { connect } from 'react-redux'

const BeatForm = (props) => {

    const presetChangeHandler = (e) => {
        if (e.target.value !== 'no preset') {
            let beat = drumPresets[e.target.value]
            props.changeHandler('all', beat)
        }
    }

    const changeHandler = (e, beats=null) => {
        if (e.target.matches('.drum-preset-select')) {
            presetChangeHandler(e)
        } else {
            let newArray = beats 
            if (beats.includes(parseInt(e.target.id))) {
                let index = newArray.findIndex(n => n === parseInt(e.target.id))
                newArray.splice(index, 1)
            } else {
                newArray.push(parseInt(e.target.id))
            }
            // props.changeHandler(e.target.name, newArray)
            if 
        }
    }

    const array = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array
    }


    const isOnMeasureLine = (i) => {
        if ((i+1) % 8 === 0 && i !== 31) {
            return true 
        }
    }

    const makeHHRows = () => {
        return array().map((n, index) => {return (
        <label className={`checkbox-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={props.hhBeats.includes(n)} name="hhBeats" id={n} onChange={(e) => changeHandler(e, props.hhBeats)}/>
            <div className='checkmark'></div>
        </label>
    )})}

    const makeSnareRows = () => {
        return array().map((n, index) => {return (
        <label className={`checkbox-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={props.snareBeats.includes(n)} name="snareBeats" id={n} onChange={(e) => changeHandler(e, props.snareBeats)}/>
            <div className='checkmark'></div>
        </label>
    )})}

    const makeKickRows = () => {
        return array().map((n, index) => {return (
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
                <button onClick={props.clearState}>Clear Drums</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    changeHHBeats,
    changeSnareBeats,
    changeKickBeats
}

const mapStateToProps = (state) => {
    return {
        hhBeats: state.hhBeats,
        snareBeats: state.snareBeats,
        kickBeats: state.kickBeats
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeatForm)