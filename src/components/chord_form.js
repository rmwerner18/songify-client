import React from 'react';
import { changeSingleChord } from '../actions/change_single_chord'
import { connect } from 'react-redux'

var Octavian = require('octavian')


class ChordForm extends React.Component {
    state = {
        bass: "",
        name: "",
        quality: "",
        formattedBass: "",
        formattedName: "",
        formattedQuality: ""
    }

    notes = [
            'A',
            'A#',
            'B',
            'C',
            'C#',
            'D',
            'D#',
            'E',
            'F',
            'F#',
            'G',
            'G#'
        ]

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.previousSibling.id]: e.target.previousSibling.innerText
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

    render() {
        console.log(this.state)
        return (
            <form onSubmit={this.submitHandler} className='chord-form'>
                <div className="chord-form-chord">
                    <fieldset className='chord-name-selection'>
                        <legend><span>Chord Name:</span></legend>
                        <label id="formattedName"><span>{this.notes[0]}</span></label>
                        <input type="checkbox" checked={this.state.name === "A4"} onChange={this.changeHandler} name="name" value="A4" id="A4"/><br/>
                        <label id="formattedName"><span>{this.notes[1]}</span></label>
                        <input type="checkbox" checked={this.state.name === "A#4"} onChange={this.changeHandler} name="name" value="A#4" id="A#4"/><br/>
                        <label id="formattedName"><span>{this.notes[2]}</span></label>
                        <input type="checkbox" checked={this.state.name === "B4"} onChange={this.changeHandler} name="name" value="B4" id="B4"/><br/>
                        <label id="formattedName"><span>{this.notes[3]}</span></label>
                        <input type="checkbox" checked={this.state.name === 'C4'} onChange={this.changeHandler} name="name" value="C4" id="C4"/><br/>
                        <label id="formattedName"><span>{this.notes[4]}</span></label>
                        <input type="checkbox" checked={this.state.name === 'C#4'} onChange={this.changeHandler} name="name" value="C#4" id="C#4"/><br/>
                        <label id="formattedName"><span>{this.notes[5]}</span></label>
                        <input type="checkbox" checked={this.state.name === 'D4'} onChange={this.changeHandler} name="name" value="D4" id="D4"/><br/>  
                        <label id="formattedName"><span>{this.notes[6]}</span></label>             
                        <input type="checkbox" checked={this.state.name === 'D#4'} onChange={this.changeHandler} name="name" value="D#4" id="D#4"/><br/>
                        <label id="formattedName"><span>{this.notes[7]}</span></label>
                        <input type="checkbox" checked={this.state.name === 'E4'} onChange={this.changeHandler} name="name" value="E4" id="E4"/><br/>  
                        <label id="formattedName"><span>{this.notes[8]}</span></label>             
                        <input type="checkbox" checked={this.state.name === 'F4'} onChange={this.changeHandler} name="name" value="F4" id="F4"/><br/>  
                        <label id="formattedName"><span>{this.notes[9]}</span></label>              
                        <input type="checkbox" checked={this.state.name === 'F#4'} onChange={this.changeHandler} name="name" value="F#4" id="F#4"/><br/>
                        <label id="formattedName"><span>{this.notes[10]}</span></label>
                        <input type="checkbox" checked={this.state.name === 'G4'} onChange={this.changeHandler} name="name" value="G4" id="G4"/><br/>   
                        <label id="formattedName"><span>{this.notes[11]}</span></label>             
                        <input type="checkbox" checked={this.state.name === 'G#4'} onChange={this.changeHandler} name="name" value="G#4" id="G#4"/><br/>
                    </fieldset>
                    <fieldset className='chord-quality-selection'>
                        <legend><span>Chord Quality:</span></legend>
                        <label id="formattedQuality"><span>M</span></label>
                        <input type="checkbox" checked={this.state.quality === "major"} onChange={this.changeHandler} name="quality" value="major"/><br/>
                        <label id="formattedQuality"><span>m</span></label>
                        <input type="checkbox" checked={this.state.quality === "minor"} onChange={this.changeHandler} name="quality" value="minor"/><br/>
                        <label id="formattedQuality"><span>maj7</span></label>
                        <input type="checkbox" checked={this.state.quality === "majorSeventh"} onChange={this.changeHandler} name="quality" value="majorSeventh"/><br/>
                        <label id="formattedQuality"><span>m7</span></label>
                        <input type="checkbox" checked={this.state.quality === 'minorSeventh'} onChange={this.changeHandler} name="quality" value="minorSeventh"/><br/>
                        <label id="formattedQuality"><span>7</span></label>
                        <input type="checkbox" checked={this.state.quality === 'dominantSeventh'} onChange={this.changeHandler} name="quality" value="dominantSeventh"/><br/>
                        <label id="formattedQuality"><span>maj6</span></label>
                        <input type="checkbox" checked={this.state.quality === 'majorSixth'} onChange={this.changeHandler} name="quality" value="majorSixth"/><br/>  
                        <label id="formattedQuality"><span>m6</span></label>             
                        <input type="checkbox" checked={this.state.quality === 'minorSixth'} onChange={this.changeHandler} name="quality" value="minorSixth"/><br/>
                        <label id="formattedQuality"><span>dim</span></label>
                        <input type="checkbox" checked={this.state.quality === 'diminished'} onChange={this.changeHandler} name="quality" value="diminished"/><br/>
                        <label id="formattedQuality"><span>dim7</span></label>
                        <input type="checkbox" checked={this.state.quality === 'diminishedSeventh'} onChange={this.changeHandler} name="quality" value="diminishedSeventh"/><br/>  
                        <label id="formattedQuality"><span>half dim</span></label>             
                        <input type="checkbox" checked={this.state.quality === 'halfDimished'} onChange={this.changeHandler} name="quality" value="halfDimished"/><br/>  
                        <label id="formattedQuality"><span>aug</span></label>              
                        <input type="checkbox" checked={this.state.quality === 'augmented'} onChange={this.changeHandler} name="quality" value="augmented"/><br/>
                        <label id="formattedQuality"><span>5</span></label>  
                        <input type="checkbox" checked={this.state.quality === '5'} onChange={this.changeHandler} name="quality" value="5"/><br/>
                    </fieldset>
                    <fieldset className='chord-bass-selection'>
                        <legend><span>Bass(optional):</span></legend>
                        <label id="formattedBass"><span>{this.notes[0]}</span></label>
                        <input type="checkbox" checked={this.state.bass === "A3"} onChange={this.changeHandler} name="bass" value="A3"/><br/>
                        <label id="formattedBass"><span>{this.notes[1]}</span></label>
                        <input type="checkbox" checked={this.state.bass === "A#3"} onChange={this.changeHandler} name="bass" value="A#3"/><br/>
                        <label id="formattedBass"><span>{this.notes[2]}</span></label>
                        <input type="checkbox" checked={this.state.bass === "B3"} onChange={this.changeHandler} name="bass" value="B3"/><br/>
                        <label id="formattedBass"><span>{this.notes[3]}</span></label>
                        <input type="checkbox" checked={this.state.bass === 'C3'} onChange={this.changeHandler} name="bass" value="C3"/><br/>
                        <label id="formattedBass"><span>{this.notes[4]}</span></label>
                        <input type="checkbox" checked={this.state.bass === 'C#3'} onChange={this.changeHandler} name="bass" value="C#3"/><br/>
                        <label id="formattedBass"><span>{this.notes[5]}</span></label>
                        <input type="checkbox" checked={this.state.bass === 'D3'} onChange={this.changeHandler} name="bass" value="D3"/><br/>  
                        <label id="formattedBass"><span>{this.notes[6]}</span></label>             
                        <input type="checkbox" checked={this.state.bass === 'D#3'} onChange={this.changeHandler} name="bass" value="D#3"/><br/>
                        <label id="formattedBass"><span>{this.notes[7]}</span></label>
                        <input type="checkbox" checked={this.state.bass === 'E3'} onChange={this.changeHandler} name="bass" value="E3"/><br/>  
                        <label id="formattedBass"><span>{this.notes[8]}</span></label>             
                        <input type="checkbox" checked={this.state.bass === 'F3'} onChange={this.changeHandler} name="bass" value="F3"/><br/>  
                        <label id="formattedBass"><span>{this.notes[9]}</span></label>              
                        <input type="checkbox" checked={this.state.bass === 'F#3'} onChange={this.changeHandler} name="bass" value="F#3"/><br/>
                        <label id="formattedBass"><span>{this.notes[10]}</span></label>
                        <input type="checkbox" checked={this.state.bass === 'G3'} onChange={this.changeHandler} name="bass" value="G3"/><br/>   
                        <label id="formattedBass"><span>{this.notes[11]}</span></label>             
                        <input type="checkbox" checked={this.state.bass === 'G#3'} onChange={this.changeHandler} name="bass" value="G#3"/><br/>
                    </fieldset>
                </div>
                <input type="submit"/>
            </form>
        )
    }
}

export default connect(null, { changeSingleChord })(ChordForm)