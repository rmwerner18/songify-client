import { render } from '@testing-library/react'
import React from 'react'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
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
import { connect } from 'react-redux'

class MelodyForm extends React.Component {

    // state = {
    //     song: {}
    // }

    // componentDidMount = () => {
    //     if (this.props.song_id) {
    //         fetch(`http://localhost:3000/songs/${this.props.song_id}`)
    //         .then(resp => resp.json())
    //         .then(song => this.setState({song: song}))
    //     }
    // }

    array = () => {
        let array = []
        for (let i=0; i<32; i++) {
            array.push(i)
        }
        return array
    }

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
            newArray = this.props.vBeats
            addOrRemoveBeat(newArray, id)
            this.props.changevBeats(newArray)
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

    isOnMeasureLine = (i) => {
        if ((i+1) % 8 === 0 && i !== 31) {
            return true 
        }
    }

    IRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.IBeats.includes(n)}name="IBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.IBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    viiRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.viiBeats.includes(n)}name="viiBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.viiBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    viRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.viBeats.includes(n)}name="viBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.viBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    vRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.vBeats.includes(n)} name="vBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.vBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    ivRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.ivBeats.includes(n)} name="ivBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.ivBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    iiiRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.iiiBeats.includes(n)} name="iiiBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.iiiBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    iiRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.iiBeats.includes(n)} name="iiBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.iiBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    iRows = () => {
        return this.array().map((n, index) => {return (
        <label className={`checkbox-container ${this.isOnMeasureLine(index) ? 'measure-line' : null}`}>
            <input key={index} type="checkbox" checked={this.props.iBeats.includes(n)} name="iBeats" id={n} onChange={(e) => this.changeHandler(e, this.props.iBeats)}/>
            <div className='checkmark'></div>
        </label>
        )})
    }
    removeNumber = (string) => {
        let newString = string.split('')
        newString.pop()
        return newString.join('')
    }
    rootOptions = () => {
        return this.keyRoots.map(root => <option key={root} value={root} selected={this.state.song.id && this.removeNumber(this.state.song.melodyKey) === this.removeNumber(root) ? "selected" : null}>{this.removeNumber(root)}</option>)
    }
    modeOptions = () => {
        return this.modes.map(mode => <option key={mode} selected={this.state.song.id && this.state.song.melodyMode === mode ? "selected" : null} value={mode}>{mode}</option>)
    }

    render() {
        return(
            this.state.song.id || this.props.song_id === null
            ?
            <div className='melody-form'>
                <div className="melody-container">
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
                <div className='mode-select'>
                    <select onChange={this.props.rootHandler}>
                        {this.rootOptions()}
                    </select>
                    <select onChange={this.props.modeHandler}>
                        {this.modeOptions()}
                    </select>
                    <button onClick={this.props.clearState}>Clear Melody</button>
                </div>
            </div>
            : 
            "loading melody"
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
    changeIBeats
}

const mapStateToProps = {
    
}

export default connect(null, mapDispatchToProps)(MelodyForm)