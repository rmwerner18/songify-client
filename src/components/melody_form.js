import React from 'react'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
import { makeBeatArray } from '../helper_functions.js/make_beat_array'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute'

const MelodyForm = () => {
    const currentSong = useSelector(state => state.currentSong)
    const iBeats = useSelector(state => state.currentSong.iBeats)
    const iiBeats = useSelector(state => state.currentSong.iiBeats)
    const iiiBeats = useSelector(state => state.currentSong.iiiBeats)
    const ivBeats = useSelector(state => state.currentSong.ivBeats)
    const vBeats = useSelector(state => state.currentSong.vBeats)
    const viBeats = useSelector(state => state.currentSong.viBeats)
    const viiBeats = useSelector(state => state.currentSong.viiBeats)
    const IBeats = useSelector(state => state.currentSong.IBeats)

    const dispatch = useDispatch()

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

    const beatTypes = {
        'iBeats': iBeats,
        'iiBeats': iiBeats,
        'iiiBeats': iiiBeats,
        'ivBeats': ivBeats,
        'vBeats': vBeats,
        'viBeats': viBeats,
        'viiBeats': viiBeats,
        'IBeats': IBeats,
    }

    const changeHandler = (e) => {
        const { name: beatType, id } = e.target
        const newArray = addOrRemoveBeat(beatTypes[beatType], id)
        dispatch(changeSongAttribute({beatType: newArray}))
    }

    const IRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={IBeats.includes(n)} name="IBeats" id={n} onChange={(e) => changeHandler(e, IBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const viiRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={viiBeats.includes(n)}name="viiBeats" id={n} onChange={(e) => changeHandler(e, viiBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const viRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={viBeats.includes(n)}name="viBeats" id={n} onChange={(e) => changeHandler(e, viBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const vRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={vBeats.includes(n)} name="vBeats" id={n} onChange={(e) => changeHandler(e, vBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const ivRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={ivBeats.includes(n)} name="ivBeats" id={n} onChange={(e) => changeHandler(e, ivBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const iiiRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={iiiBeats.includes(n)} name="iiiBeats" id={n} onChange={(e) => changeHandler(e, iiiBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const iiRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={iiBeats.includes(n)} name="iiBeats" id={n} onChange={(e) => changeHandler(e, iiBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    const iRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={iBeats.includes(n)} name="iBeats" id={n} onChange={(e) => changeHandler(e, iBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }

    return(
        <div className='melody-form'>
            <div className='melody-container'>
                <div className='melody-labels'>
                    <p>i</p>
                    <p>vii</p>
                    <p>vi</p>
                    <p>v</p>
                    <p>iv</p>
                    <p>iii</p>
                    <p>ii</p>
                    <p>i</p>
                </div>
                <div>
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
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    // changeiBeats,
    // changeiiBeats,
    // changeiiiBeats,
    // changeivBeats,
    // changevBeats,
    // changeviBeats,
    // changeviiBeats,
    // changeIBeats,
    changeSongAttribute
}

const mapStateToProps = state => {
    return {
        iBeats: state.currentSong.iBeats,
        iiBeats: state.currentSong.iiBeats,
        iiiBeats: state.currentSong.iiiBeats,
        ivBeats: state.currentSong.ivBeats,
        vBeats: state.currentSong.vBeats,
        viBeats: state.currentSong.viBeats,
        viiBeats: state.currentSong.viiBeats,
        IBeats: state.currentSong.IBeats,
        songId: state.currentSong.id,
        melodyKey: state.currentSong.melodyKey,
        melodyMode: state.currentSong.melodyMode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MelodyForm)