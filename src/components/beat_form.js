import { render } from '@testing-library/react'
import React from 'react'
import BeatSelect from './beat_select'

const BeatForm = (props) => {

    const changeHandler = (e, beats) => {
        console.log(e.target.id)
        let newArray = beats 
        if (beats.includes(parseInt(e.target.id))) {
            let index = newArray.findIndex(n => n === parseInt(e.target.id))
            newArray.splice(index, 1)
        } else {
            newArray.push(parseInt(e.target.id))
            console.log(newArray)
        }
        props.changeHandler(e.target.name, newArray)
    }

    const array = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array
    }

    const makeHHRows = () => {
        return array().map(n => <input type="checkbox" checked={props.hhBeats.includes(n)} name="hhBeats" id={n} onChange={(e) => changeHandler(e, props.hhBeats)}/>)
    }

    const makeSnareRows = () => {
        return array().map(n => <input type="checkbox" checked={props.snareBeats.includes(n)} name="snareBeats" id={n} onChange={(e) => changeHandler(e, props.snareBeats)}/>)
    }

    const makeKickRows = () => {
        return array().map(n => <input type="checkbox" checked={props.kickBeats.includes(n)} name="kickBeats" id={n} onChange={(e) => changeHandler(e, props.kickBeats)}/>)
    }

    return(
        <>
        <div className='checkbox-row'>   
            {makeHHRows()}
        </div>
        <div className='checkbox-row'>
            {makeSnareRows()}
        </div>
        <div className='checkbox-row'>
            {makeKickRows()}
        </div>
        <BeatSelect changeHandler={props.presetChangeHandler} />
        <button onClick={props.clearState}>Clear Drums</button>
        </>
    )
}

export default BeatForm