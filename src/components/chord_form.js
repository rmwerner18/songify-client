import React from 'react';
import { changeSingleChord } from '../actions/change_single_chord'
import { notes, trebleNotes, bassNotes } from '../notes'
import { chordQualityAbbreviations, chordQualityFullNames } from '../chord_qualities'
import { connect } from 'react-redux'

var Octavian = require('octavian')


class ChordForm extends React.Component {
    chord = this.props.chords[this.props.id]

    state = {
        bass: this.chord.bass,
        name:  this.chord.name,
        quality:  this.chord.quality,
        formattedBass: this.chord.formattedBass,
        formattedName: this.chord.formattedName,
        formattedQuality: this.chord.formattedQuality
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.parentNode.id]: e.target.parentNode.innerText
        })
    }

    createBass = (bass, name) => {
        if (bass.length > 0) {
            return new Octavian.Note(bass)
        } else {
            return new Octavian.Note(name).downOctave()
        }
    }

    createChord = (name, qual) => {
        let chord
        if (qual === "augmented") {
            chord = new Octavian.Chord(name)
            chord.addInterval('majorThird')
            chord.addInterval('minorSixth')
        } else if (qual === "5") {
            chord = new Octavian.Chord(name)
            chord.addInterval('perfectFifth')
            chord.addInterval('perfectOctave')
        } else {
            chord = new Octavian.Chord(name, qual)
        }
        return chord
    }

    getFrequencies = (bass, name, qual) => {
        let chord = this.createChord(name, qual)
        let freqs = chord.frequencies
        let b = this.createBass(bass, name)
        freqs.push(b.frequency)
        return freqs
    }

    submitHandler = (e) => {
        e.preventDefault()
        let newObj = this.state
        let freqs = this.getFrequencies(this.state.bass, this.state.name, this.state.quality)
        newObj.freqs = freqs
        this.props.changeSingleChord(this.props.id, newObj)
        this.props.closeHandler()
    }

    makeNameOptions = () => {
        return notes.map((note, index) => {return (
            <>
                <label id="formattedName" className="chord-checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={this.state.name === trebleNotes[index]} 
                        onChange={this.changeHandler} 
                        name="name" 
                        value={trebleNotes[index]} 
                        id={trebleNotes[index]}/>
                    <div className='checkmark'>
                        <span>{note}</span>
                    </div>
                </label>        
            </>
        )})
    }

    makeQualityOptions = () => {
        return chordQualityAbbreviations.map((quality, index) => {return (
            <>
                <label id="formattedQuality" className="chord-checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={this.state.quality === chordQualityFullNames[index]} 
                        onChange={this.changeHandler} 
                        name="quality" 
                        value={chordQualityFullNames[index]}/>
                    <div className='checkmark'>
                        <span>{quality}</span>
                    </div>
                </label>
            </>
        )})
    }

    makeBassOptions = () => {
        return notes.map((note, index) => {return (
            <>
                <label id="formattedBass" className="chord-checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={this.state.bass === bassNotes[index]}
                        onChange={this.changeHandler} 
                        name="bass" 
                        value={bassNotes[index]}/>
                    <div className='checkmark'>
                        <span>{note}</span>
                    </div>
                </label>
            </>
        )
        })
    }

    

    render() {
        return (
            <form onSubmit={this.submitHandler} className='chord-form'>
                <div className="chord-form-chord">
                    <fieldset className='chord-selection'>
                        <legend><span>Chord Name:</span></legend>
                        {this.makeNameOptions()}
                    </fieldset>
                    <fieldset className='chord-selection'>
                        <legend><span>Chord Quality:</span></legend>
                        {this.makeQualityOptions()}
                    </fieldset>
                    <fieldset className='chord-selection'>
                        <legend><span>Bass(optional):</span></legend>
                        {this.makeBassOptions()}
                    </fieldset>
                </div>
                <input type="submit" className='modal-button button'/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        chords: state.currentSong.chords
    }
}
export default connect(mapStateToProps, { changeSingleChord })(ChordForm)