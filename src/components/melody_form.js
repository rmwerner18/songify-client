import React from 'react'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
import { makeBeatArray } from '../helper_functions.js/make_beat_array'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'
import { clearMelody } from '../actions/clear_melody'
import { changeKey, changeMode } from '../actions/change_key_and_mode'
import { connect } from 'react-redux'
import {
    changeiBeats,
    changeiiBeats,
    changeiiiBeats,
    changeivBeats,
    changevBeats,
    changeviBeats,
    changeviiBeats,
    changeIBeats
} from '../actions/change_melody'

class MelodyForm extends React.Component {

    keyRoots = [
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

    modes = [
        "ionian",
        "dorian",
        "phrygian",
        "lydian",
        "mixolydian",
        "aeolian",
        "locrian"
    ]


    changeHandler = (e) => {
        let newArray
        let id = e.target.id
        if (e.target.name === 'iBeats') {
            newArray = this.props.iBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeiBeats(newArray)
        } else if (e.target.name === 'iiBeats') {
            newArray = this.props.iiBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeiiBeats(newArray)
        } else if (e.target.name === 'iiiBeats') {
            newArray = this.props.iiiBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeiiiBeats(newArray)
        } else if (e.target.name === 'ivBeats') {
            newArray = this.props.ivBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeivBeats(newArray)
        } else if (e.target.name === 'vBeats') {
            newArray = this.props.vBeats
            addOrRemoveBeat(newArray, id)
            this.props.changevBeats(newArray)
        } else if (e.target.name === 'viBeats') {
            newArray = this.props.viBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeviBeats(newArray)
        } else if (e.target.name === 'viiBeats') {
            newArray = this.props.viiBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeviiBeats(newArray)
        } else if (e.target.name === 'IBeats') {
            newArray = this.props.IBeats
            addOrRemoveBeat(newArray, id)
            this.props.changeIBeats(newArray)
        } 
    }

    IRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.IBeats.includes(n)} name="IBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.IBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    viiRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.viiBeats.includes(n)}name="viiBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.viiBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    viRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.viBeats.includes(n)}name="viBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.viBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    vRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.vBeats.includes(n)} name="vBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.vBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    ivRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.ivBeats.includes(n)} name="ivBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.ivBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    iiiRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.iiiBeats.includes(n)} name="iiiBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.iiiBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    iiRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.iiBeats.includes(n)} name="iiBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.iiBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    iRows = () => {
        return makeBeatArray().map((n, index) => {return (
        <div className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <label className='checkbox-container'>
                <input key={index} type="checkbox" checked={this.props.iBeats.includes(n)} name="iBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.iBeats)}/>
                <div className='checkmark'></div>
            </label>
        </div>
        )})
    }
    removeNumber = (string) => {
        let newString = string.split('')
        newString.pop()
        return newString.join('')
    }
    rootOptions = () => {
        return this.keyRoots.map(root => <option key={root} value={root} selected={this.removeNumber(this.props.melodyKey) === this.removeNumber(root) ? "selected" : null}>{this.removeNumber(root)}</option>)
    }
    modeOptions = () => {
        return this.modes.map(mode => <option key={mode} selected={this.props.melodyMode === mode ? "selected" : null} value={mode}>{mode}</option>)
    }

    render() {
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
                            {this.IRows()}
                        </div>
                        <div className='checkbox-row'>
                            {this.viiRows()}
                        </div>
                        <div className='checkbox-row'>
                            {this.viRows()}
                        </div>
                        <div className='checkbox-row'>   
                            {this.vRows()}
                        </div>
                        <div className='checkbox-row'>
                            {this.ivRows()}
                        </div>
                        <div className='checkbox-row'>
                            {this.iiiRows()}
                        </div>
                        <div className='checkbox-row'>
                            {this.iiRows()}
                        </div>
                        <div className='checkbox-row'>
                            {this.iRows()}
                        </div>
                    </div>
                </div>
                {/* <div className='mode-select'>
                    <select onChange={e => this.props.changeKey(e.target.value)}>
                        {this.rootOptions()}
                    </select>
                    <select onChange={e => this.props.changeMode(e.target.value)}>
                        {this.modeOptions()}
                    </select>
                    <button className='button'onClick={this.props.clearMelody}>Clear Melody</button>
                </div> */}
            </div>
        )

    }
}

const mapDispatchToProps = {
    changeiBeats,
    changeiiBeats,
    changeiiiBeats,
    changeivBeats,
    changevBeats,
    changeviBeats,
    changeviiBeats,
    changeIBeats,
    changeKey,
    changeMode,
    clearMelody
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