import React from 'react';

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
        this.props.submitHandler(e, this.props.id, newObj)
    }

    render() {
        return (
            <form onSubmit={this.submitHandler} >
                <fieldset>
                    <legend>Chord Name:</legend>
                    <label id="formattedName">{this.notes[0]}</label>
                    <input type="checkbox" checked={this.state.name === "A4"} onChange={this.changeHandler} name="name" value="A4" id="A4"/>
                    <label id="formattedName">{this.notes[1]}</label>
                    <input type="checkbox" checked={this.state.name === "A#4"} onChange={this.changeHandler} name="name" value="A#4" id="A#4"/>
                    <label id="formattedName">{this.notes[2]}</label>
                    <input type="checkbox" checked={this.state.name === "B4"} onChange={this.changeHandler} name="name" value="B4" id="B4"/>
                    <label id="formattedName">{this.notes[3]}</label>
                    <input type="checkbox" checked={this.state.name === 'C4'} onChange={this.changeHandler} name="name" value="C4" id="C4"/>
                    <label id="formattedName">{this.notes[4]}</label>
                    <input type="checkbox" checked={this.state.name === 'C#4'} onChange={this.changeHandler} name="name" value="C#4" id="C#4"/>
                    <label id="formattedName">{this.notes[5]}</label>
                    <input type="checkbox" checked={this.state.name === 'D4'} onChange={this.changeHandler} name="name" value="D4" id="D4"/>  
                    <label id="formattedName">{this.notes[6]}</label>             
                    <input type="checkbox" checked={this.state.name === 'D#4'} onChange={this.changeHandler} name="name" value="D#4" id="D#4"/>
                    <label id="formattedName">{this.notes[7]}</label>
                    <input type="checkbox" checked={this.state.name === 'E4'} onChange={this.changeHandler} name="name" value="E4" id="E4"/>  
                    <label id="formattedName">{this.notes[8]}</label>             
                    <input type="checkbox" checked={this.state.name === 'F4'} onChange={this.changeHandler} name="name" value="F4" id="F4"/>  
                    <label id="formattedName">{this.notes[9]}</label>              
                    <input type="checkbox" checked={this.state.name === 'F#4'} onChange={this.changeHandler} name="name" value="F#4" id="F#4"/>
                    <label id="formattedName">{this.notes[10]}</label>
                    <input type="checkbox" checked={this.state.name === 'G4'} onChange={this.changeHandler} name="name" value="G4" id="G4"/>   
                    <label id="formattedName">{this.notes[11]}</label>             
                    <input type="checkbox" checked={this.state.name === 'G#4'} onChange={this.changeHandler} name="name" value="G#4" id="G#4"/>
                </fieldset>
                <fieldset>
                    <legend>Chord Quality:</legend>
                    <label id="formattedQuality">M</label>
                    <input type="checkbox" checked={this.state.quality === "major"} onChange={this.changeHandler} name="quality" value="major"/>
                    <label id="formattedQuality">m</label>
                    <input type="checkbox" checked={this.state.quality === "minor"} onChange={this.changeHandler} name="quality" value="minor"/>
                    <label id="formattedQuality">maj7</label>
                    <input type="checkbox" checked={this.state.quality === "majorSeventh"} onChange={this.changeHandler} name="quality" value="majorSeventh"/>
                    <label id="formattedQuality">m7</label>
                    <input type="checkbox" checked={this.state.quality === 'minorSeventh'} onChange={this.changeHandler} name="quality" value="minorSeventh"/>
                    <label id="formattedQuality">7</label>
                    <input type="checkbox" checked={this.state.quality === 'dominantSeventh'} onChange={this.changeHandler} name="quality" value="dominantSeventh"/>
                    <label id="formattedQuality">maj6</label>
                    <input type="checkbox" checked={this.state.quality === 'majorSixth'} onChange={this.changeHandler} name="quality" value="majorSixth"/>  
                    <label id="formattedQuality">m6</label>             
                    <input type="checkbox" checked={this.state.quality === 'minorSixth'} onChange={this.changeHandler} name="quality" value="minorSixth"/>
                    <label id="formattedQuality">dim</label>
                    <input type="checkbox" checked={this.state.quality === 'diminished'} onChange={this.changeHandler} name="quality" value="diminished"/>
                    <label id="formattedQuality">dim7</label>
                    <input type="checkbox" checked={this.state.quality === 'diminishedSeventh'} onChange={this.changeHandler} name="quality" value="diminishedSeventh"/>  
                    <label id="formattedQuality">half dim</label>             
                    <input type="checkbox" checked={this.state.quality === 'halfDimished'} onChange={this.changeHandler} name="quality" value="halfDimished"/>  
                    <label id="formattedQuality">aug</label>              
                    <input type="checkbox" checked={this.state.quality === 'augmented'} onChange={this.changeHandler} name="quality" value="augmented"/>
                    <label id="formattedQuality">5</label>  
                    <input type="checkbox" checked={this.state.quality === '5'} onChange={this.changeHandler} name="quality" value="5"/>
                </fieldset>
                <fieldset>
                    <legend>Bass Note (optional):</legend>
                    <label id="formattedBass">{this.notes[0]}</label>
                    <input type="checkbox" checked={this.state.bass === "A3"} onChange={this.changeHandler} name="bass" value="A3"/>
                    <label id="formattedBass">{this.notes[1]}</label>
                    <input type="checkbox" checked={this.state.bass === "A#3"} onChange={this.changeHandler} name="bass" value="A#3"/>
                    <label id="formattedBass">{this.notes[2]}</label>
                    <input type="checkbox" checked={this.state.bass === "B3"} onChange={this.changeHandler} name="bass" value="B3"/>
                    <label id="formattedBass">{this.notes[3]}</label>
                    <input type="checkbox" checked={this.state.bass === 'C3'} onChange={this.changeHandler} name="bass" value="C3"/>
                    <label id="formattedBass">{this.notes[4]}</label>
                    <input type="checkbox" checked={this.state.bass === 'C#3'} onChange={this.changeHandler} name="bass" value="C#3"/>
                    <label id="formattedBass">{this.notes[5]}</label>
                    <input type="checkbox" checked={this.state.bass === 'D3'} onChange={this.changeHandler} name="bass" value="D3"/>  
                    <label id="formattedBass">{this.notes[6]}</label>             
                    <input type="checkbox" checked={this.state.bass === 'D#3'} onChange={this.changeHandler} name="bass" value="D#3"/>
                    <label id="formattedBass">{this.notes[7]}</label>
                    <input type="checkbox" checked={this.state.bass === 'E3'} onChange={this.changeHandler} name="bass" value="E3"/>  
                    <label id="formattedBass">{this.notes[8]}</label>             
                    <input type="checkbox" checked={this.state.bass === 'F3'} onChange={this.changeHandler} name="bass" value="F3"/>  
                    <label id="formattedBass">{this.notes[9]}</label>              
                    <input type="checkbox" checked={this.state.bass === 'F#3'} onChange={this.changeHandler} name="bass" value="F#3"/>
                    <label id="formattedBass">{this.notes[10]}</label>
                    <input type="checkbox" checked={this.state.bass === 'G3'} onChange={this.changeHandler} name="bass" value="G3"/>   
                    <label id="formattedBass">{this.notes[11]}</label>             
                    <input type="checkbox" checked={this.state.bass === 'G#3'} onChange={this.changeHandler} name="bass" value="G#3"/>
                </fieldset>
                <input type="submit"/>
            </form>
        )
    }
}

export default ChordForm