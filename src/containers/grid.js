import React from 'react';
import * as Tone from 'tone'
import Chord from '../components/chord'
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import modes from '../modes'
import defaultChords from '../default_chords'
import drumPresets from '../drum_presets'
import chordPresets from '../chord_presets'

class Grid extends React.Component {
    state = {
        chords: defaultChords,
        bpm: 100,
        snareBeats: [],
        kickBeats: [],
        hhBeats: [],
        instrument: "synth",
        iBeats: [],
        iiBeats: [],
        iiiBeats: [],
        ivBeats: [],
        vBeats: [],
        viBeats: [],
        viiBeats: [],
        IBeats: [],
        melodyKey: "C5",
        melodyMode: "ionian"
    }

    componentDidMount = () => {
        if (this.props.song_id) {
            fetch(`http://localhost:3000/songs/${this.props.song_id}`)
            .then(resp => resp.json())
            .then(song => this.setState(song))
        }
    }

    chordSubmitHandler = (e, id, state) => {
        e.preventDefault()
        let newArray = this.state.chords
        newArray.splice(id, 1, state)
        this.setState({chords: newArray})
    }

    tempoChangeHandler = (bpm) => {
        console.log("GRID", bpm)
        this.setState({bpm: bpm})
    }

    showChords = () => {
            return this.state.chords.map((chord, index) => {
                return <Chord id={index} key={index} chord={chord} submitHandler={this.chordSubmitHandler}/>
            })
    }

    beatChangeHandler = (type, array) => {
        this.setState({[type]: array})
    }

    instrumentChangeHandler = (e) => {
        console.log(e.target.value)
        this.setState({instrument: e.target.value})
    }

    melodyChangeHandler = (degree, array) => {
        this.setState({[degree]: array})
    }

    clearDrumState = () => {
        this.setState({
            hhBeats: [],
            snareBeats: [],
            kickBeats: []
        })
    }

    clearMelodyState = () => {
        this.setState({
            IBeats: [],
            viiBeats: [],
            viBeats: [],
            vBeats: [],
            ivBeats: [],
            iiiBeats: [],
            iiBeats: [],
            iBeats: []
        })
    }

    randomProgGenereator = () => {
        let max = chordPresets.length
        let int =  Math.floor(Math.random() * Math.floor(max));
        this.setState({chords: chordPresets[int]})
    }

    rootHandler = (e) => {
        this.setState({melodyKey: e.target.value})
    }

    modeHandler = (e) => {
        this.setState({melodyMode: e.target.value})
    }

    beatPresetChangeHandler = (e) => {
        if (e.target.value != 'no preset') {
            let beat = drumPresets[e.target.value]
            this.setState({
                kickBeats: beat.kickBeats,
                snareBeats: beat.snareBeats,
                hhBeats: beat.hhBeats
            })
        }
    }

    saveSongHandler = () => {
        this.props.song_id
        ?
        fetch(`http://localhost:3000/songs/${this.props.song_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(
                this.state
            )
        })
        :
        fetch('http://localhost:3000/songs', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify(
                this.state
            )
        })
    }
 
    render() {

        return (
            <div className="song-maker-container">
                <div className="chord-container">
                    {this.showChords()}
                </div>
                <button id='start-button' onClick={(e) => this.props.playHandler(e, this.state)}>Start</button>
                <TempoForm bpm={this.state.bpm} changeHandler={this.tempoChangeHandler} />
                <InstrumentForm changeHandler={this.instrumentChangeHandler}/>
                <button onClick={this.randomProgGenereator}>Generate Random Progression</button>
                <BeatForm 
                    hhBeats={this.state.hhBeats} 
                    snareBeats={this.state.snareBeats} 
                    kickBeats={this.state.kickBeats}
                    changeHandler={this.beatChangeHandler}
                    presetChangeHandler={this.beatPresetChangeHandler} 
                    clearState={this.clearDrumState}
                />
                <br/>
                <br/>
                <MelodyForm
                    IBeats={this.state.IBeats}
                    viiBeats={this.state.viiBeats}
                    viBeats={this.state.viBeats}
                    vBeats={this.state.vBeats}
                    ivBeats={this.state.ivBeats}
                    iiiBeats={this.state.iiiBeats}
                    iiBeats={this.state.iiBeats}
                    iBeats={this.state.iBeats}
                    changeHandler={this.melodyChangeHandler} 
                    rootHandler={this.rootHandler}
                    modeHandler={this.modeHandler}
                    clearState={this.clearMelodyState}
                />
                <button onClick={this.saveSongHandler}>Save</button>
            </div>
        )
    }
}

export default Grid