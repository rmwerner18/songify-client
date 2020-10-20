import { render } from '@testing-library/react'
import React from 'react'

class MelodyForm extends React.Component {

    state = {
        song: {}
    }

    componentDidMount = () => {
        if (this.props.song_id) {
            fetch(`http://localhost:3000/songs/${this.props.song_id}`)
            .then(resp => resp.json())
            .then(song => this.setState({song: song}))
        }
    }

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


    changeHandler = (e, beats) => {
        
        let newArray = beats 
        if (beats.includes(parseInt(e.target.id))) {
            let index = newArray.findIndex(n => n === parseInt(e.target.id))
            newArray.splice(index, 1)
        } else {
            newArray.push(parseInt(e.target.id))
        }

        this.props.changeHandler(e.target.name, newArray)
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

export default MelodyForm