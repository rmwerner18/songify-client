import React from 'react';
import * as Tone from 'tone'

var Octavian = require('octavian')

class ChordForm extends React.Component {
    state = {
        bass: "",
        name: "",
        quality: ""
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

    clickHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.props.submitHandler(e, this.props.id, this.state)}>
                <fieldset>
                    <legend>Chord Name:</legend>
                    <label>{this.notes[0]}</label>
                    <input type="checkbox" checked={this.state.name === "A"} onClick={this.clickHandler} name="name" value="A"/>
                    <label>{this.notes[1]}</label>
                    <input type="checkbox" checked={this.state.name === "A#"} onClick={this.clickHandler} name="name" value="A#"/>
                    <label>{this.notes[2]}</label>
                    <input type="checkbox" checked={this.state.name === "B"} onClick={this.clickHandler} name="name" value="B"/>
                    <label>{this.notes[3]}</label>
                    <input type="checkbox" checked={this.state.name === 'C'} onClick={this.clickHandler} name="name" value="C"/>
                    <label>{this.notes[4]}</label>
                    <input type="checkbox" checked={this.state.name === 'C#'} onClick={this.clickHandler} name="name" value="C#"/>
                    <label>{this.notes[5]}</label>
                    <input type="checkbox" checked={this.state.name === 'D'} onClick={this.clickHandler} name="name" value="D"/>  
                    <label>{this.notes[6]}</label>             
                    <input type="checkbox" checked={this.state.name === 'D#'} onClick={this.clickHandler} name="name" value="D#"/>
                    <label>{this.notes[7]}</label>
                    <input type="checkbox" checked={this.state.name === 'E'} onClick={this.clickHandler} name="name" value="E"/>  
                    <label>{this.notes[8]}</label>             
                    <input type="checkbox" checked={this.state.name === 'F'} onClick={this.clickHandler} name="name" value="F"/>  
                    <label>{this.notes[9]}</label>              
                    <input type="checkbox" checked={this.state.name === 'F#'} onClick={this.clickHandler} name="name" value="F#"/>
                    <label>{this.notes[10]}</label>
                    <input type="checkbox" checked={this.state.name === 'G'} onClick={this.clickHandler} name="name" value="G"/>   
                    <label>{this.notes[11]}</label>             
                    <input type="checkbox" checked={this.state.name === 'G#'} onClick={this.clickHandler} name="name" value="G#"/>
                </fieldset>
                <fieldset>
                    <legend>Chord Quality:</legend>
                    <label>M</label>
                    <input type="checkbox" checked={this.state.quality === "major"} onClick={this.clickHandler} name="quality" value="major"/>
                    <label>m</label>
                    <input type="checkbox" checked={this.state.quality === "minor"} onClick={this.clickHandler} name="quality" value="minor"/>
                    <label>M7</label>
                    <input type="checkbox" checked={this.state.quality === "majorSeventh"} onClick={this.clickHandler} name="quality" value="majorSeventh"/>
                    <label>m7</label>
                    <input type="checkbox" checked={this.state.quality === 'minorSeventh'} onClick={this.clickHandler} name="quality" value="minorSeventh"/>
                    <label>7</label>
                    <input type="checkbox" checked={this.state.quality === 'dominantSeventh'} onClick={this.clickHandler} name="quality" value="dominantSeventh"/>
                    <label>M6</label>
                    <input type="checkbox" checked={this.state.quality === 'majorSixth'} onClick={this.clickHandler} name="quality" value="majorSixth"/>  
                    <label>m6</label>             
                    <input type="checkbox" checked={this.state.quality === 'minorSixth'} onClick={this.clickHandler} name="quality" value="minorSixth"/>
                    <label>dim</label>
                    <input type="checkbox" checked={this.state.quality === 'diminished'} onClick={this.clickHandler} name="quality" value="diminished"/>
                    <label>dim7</label>
                    <input type="checkbox" checked={this.state.quality === 'diminishedSeventh'} onClick={this.clickHandler} name="quality" value="diminishedSeventh"/>  
                    <label>half dim</label>             
                    <input type="checkbox" checked={this.state.quality === 'halfDimished'} onClick={this.clickHandler} name="quality" value="halfDimished"/>  
                    <label>aug</label>              
                    <input type="checkbox" checked={this.state.quality === 'augmented'} onClick={this.clickHandler} name="quality" value="augmented"/>
                </fieldset>
                <fieldset>
                    <legend>Bass Note:</legend>
                    <label>{this.notes[0]}</label>
                    <input type="checkbox" checked={this.state.bass === "A"} onClick={this.clickHandler} name="bass" value="A"/>
                    <label>{this.notes[1]}</label>
                    <input type="checkbox" checked={this.state.bass === "A#"} onClick={this.clickHandler} name="bass" value="A#"/>
                    <label>{this.notes[2]}</label>
                    <input type="checkbox" checked={this.state.bass === "B"} onClick={this.clickHandler} name="bass" value="B"/>
                    <label>{this.notes[3]}</label>
                    <input type="checkbox" checked={this.state.bass === 'C'} onClick={this.clickHandler} name="bass" value="C"/>
                    <label>{this.notes[4]}</label>
                    <input type="checkbox" checked={this.state.bass === 'C#'} onClick={this.clickHandler} name="bass" value="C#"/>
                    <label>{this.notes[5]}</label>
                    <input type="checkbox" checked={this.state.bass === 'D'} onClick={this.clickHandler} name="bass" value="D"/>  
                    <label>{this.notes[6]}</label>             
                    <input type="checkbox" checked={this.state.bass === 'D#'} onClick={this.clickHandler} name="bass" value="D#"/>
                    <label>{this.notes[7]}</label>
                    <input type="checkbox" checked={this.state.bass === 'E'} onClick={this.clickHandler} name="bass" value="E"/>  
                    <label>{this.notes[8]}</label>             
                    <input type="checkbox" checked={this.state.bass === 'F'} onClick={this.clickHandler} name="bass" value="F"/>  
                    <label>{this.notes[9]}</label>              
                    <input type="checkbox" checked={this.state.bass === 'F#'} onClick={this.clickHandler} name="bass" value="F#"/>
                    <label>{this.notes[10]}</label>
                    <input type="checkbox" checked={this.state.bass === 'G'} onClick={this.clickHandler} name="bass" value="G"/>   
                    <label>{this.notes[11]}</label>             
                    <input type="checkbox" checked={this.state.bass === 'G#'} onClick={this.clickHandler} name="bass" value="G#"/>
                </fieldset>
                <input type="submit"/>
            </form>
        )
    }
}

export default ChordForm