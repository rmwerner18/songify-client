import React from 'react'
import drumPresets from '../drum_presets'

const MelodyForm = (props) => {

    const array = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array
    }

    const keyRoots = [
        'C5',
        'C#5',
        'D5',
        'D#5',
        'E5',
        'F5',
        'F#5',
        'G5',
        'G#5',
        'A5',
        'A#5',
        'B5'
    ]

    const modes = [
        "ionian",
        "dorian",
        "phrygian",
        "lydian",
        "mixolydian",
        "aeolian",
        "locrian"
    ]


    const changeHandler = (e, beats) => {
        
        let newArray = beats 
        if (beats.includes(parseInt(e.target.id))) {
            let index = newArray.findIndex(n => n === parseInt(e.target.id))
            newArray.splice(index, 1)
        } else {
            newArray.push(parseInt(e.target.id))
        }

        props.changeHandler(e.target.name, newArray)
    }

    const isOnMeasureLine = (i) => {
        if ((i+1) % 8 === 0 && i != 31) {
            return true 
        }
    }

    const IRows = () => {
        return array().map((n, index) => <input type="checkbox" className={isOnMeasureLine(index) ? 'measure-line' : null} checked={props.IBeats.includes(n)} name="IBeats" id={n} onChange={(e) => changeHandler(e, props.IBeats)} />)
    }
    const viiRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.viiBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null} name="viiBeats" id={n} onChange={(e) => changeHandler(e, props.viiBeats)}/>)
    }
    const viRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.viBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null} name="viBeats" id={n} onChange={(e) => changeHandler(e, props.viBeats)}/>)
    }
    const vRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.vBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null}  name="vBeats" id={n} onChange={(e) => changeHandler(e, props.vBeats)}/>)
    }
    const ivRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.ivBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null}  name="ivBeats" id={n} onChange={(e) => changeHandler(e, props.ivBeats)}/>)
    }
    const iiiRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.iiiBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null}  name="iiiBeats" id={n} onChange={(e) => changeHandler(e, props.iiiBeats)}/>)
    }
    const iiRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.iiBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null}  name="iiBeats" id={n} onChange={(e) => changeHandler(e, props.iiBeats)}/>)
    }
    const iRows = () => {
        return array().map((n, index) => <input type="checkbox" checked={props.iBeats.includes(n)} className={isOnMeasureLine(index) ? 'measure-line' : null}  name="iBeats" id={n} onChange={(e) => changeHandler(e, props.iBeats)}/>)
    }
    const removeNumber = (string) => {
        let newString = string.split('')
        newString.pop()
        return newString.join('')
    }
    const rootOptions = () => {
        return keyRoots.map(root => <option value={root}>{removeNumber(root)}</option>)
    }
    const modeOptions = () => {
        return modes.map(mode => <option value={mode}>{mode}</option>)
    }

    return(
        <>
            <div className="melody-container">
                <div className='checkbox-row'>   
                    {IRows()}
                </div>
                <div className='checkbox-row'>
                    {viiRows()}
                </div>
                <div className='checkbox-row'>
                    {viRows()}
                </div>
                <div className='checkbox-row'>   
                    {vRows()}
                </div>
                <div className='checkbox-row'>
                    {ivRows()}
                </div>
                <div className='checkbox-row'>
                    {iiiRows()}
                </div>
                <div className='checkbox-row'>
                    {iiRows()}
                </div>
                <div className='checkbox-row'>
                    {iRows()}
                </div>
            </div>
            <div className='mode-select'>
                <select onChange={props.rootHandler}>
                    {rootOptions()}
                </select>
                <select onChange={props.modeHandler}>
                    {modeOptions()}
                </select>
            </div>
            <button onClick={props.clearState}>Clear Melody</button>
        </>
    )
}

export default MelodyForm