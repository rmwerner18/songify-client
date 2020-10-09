import React from 'react';
import * as Tone from 'tone'
import Chord from '../components/chord'
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import modes from '../modes'
import defaultChords from '../default_chords'

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


    chordProgression = (index, time, synth, snare, kick, hh) => {
        let chords = this.state.chords.map(chord => chord.freqs)
        Tone.Transport.bpm.value = parseInt(this.state.bpm)
        if ([0, 4].includes(index)) {
            synth.triggerAttackRelease(chords[0], '2n', time)
        } else if ([8, 12].includes(index)) {
            synth.triggerAttackRelease(chords[1], '2n', time)
        } else if ([16, 20].includes(index)) {
            synth.triggerAttackRelease(chords[2], '2n', time)
        } else if ([24, 28].includes(index)) {
            synth.triggerAttackRelease(chords[3], '2n', time)
        } 
        if (this.state.kickBeats.includes(index)) {
            kick.start(time)
        }
        if (this.state.snareBeats.includes(index)) {
            snare.start(time)
        }
        if (this.state.hhBeats.includes(index)) {
            hh.start(time);
        }
        if (this.state.iBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[0], '8n', time)
        }
        if (this.state.iiBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[1], '8n', time)
        }
        if (this.state.iiiBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[2], '8n', time)
        }
        if (this.state.ivBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[3], '8n', time)
        }
        if (this.state.vBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[4], '8n', time)
        }
        if (this.state.viBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[5], '8n', time)
        }
        if (this.state.viiBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[6], '8n', time)
        }
        if (this.state.IBeats.includes(index)) {
            synth.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[7], '8n', time)
        }

    }

    setNumOfEigthNotes = (n, array) => {
        for (let i=0; i<n; i++) {
            array.push(i)
        }
    }

    startLoop = () => {
        const snare = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/snare.wav").toDestination();
        const kick = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav").toDestination();
        const hh = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-close.wav").toDestination();
        let instrument
        if (this.state.instrument === "piano") {
            instrument = new Tone.Sampler({
                urls: {
                    "C4": "C4.mp3",
                    "D#4": "Ds4.mp3",
                    "F#4": "Fs4.mp3",
                    "A4": "A4.mp3",
                },
                release: 1,
                baseUrl: "https://tonejs.github.io/audio/salamander/",
            }).toDestination();
        } else if (this.state.instrument === "synth") {
            instrument = new Tone.PolySynth().toDestination();
        }
        let array = []
        this.setNumOfEigthNotes(32, array)
        Tone.loaded().then(() => {
            const seq = new Tone.Sequence((time, index) => {
                this.chordProgression(index, time, instrument, snare, kick, hh)
            }, array).start(0);
            Tone.Transport.start();
        })
    }

    stopLoop = () => {
        Tone.Transport.stop()
        Tone.Transport.cancel()
    }
    
    clickHandler = () => {
        // HANDLES LOOP
        if (Tone.Transport.state === "stopped") {
            this.startLoop()
        } else {
            this.stopLoop()
        }
    }

    chordSubmitHandler = (e, id, state) => {
        e.preventDefault()
        let newArray = this.state.chords
        newArray.splice(id, 1, state)
        this.setState({chords: newArray})
    }

    tempoChangeHandler = (bpm) => {
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

    rootHandler = (e) => {
        this.setState({melodyKey: e.target.value})
    }

    modeHandler = (e) => {
        this.setState({melodyMode: e.target.value})
    }


 
    render() {
        console.log("Mode:", this.state.melodyMode)
        return (
            <>
                <div className="chord-container">
                    {this.showChords()}
                </div>
                <button onClick={this.clickHandler}>start</button>
                <TempoForm bpm={this.state.bpm} changeHandler={this.tempoChangeHandler} />
                <InstrumentForm changeHandler={this.instrumentChangeHandler}/>
                <BeatForm 
                    hhBeats={this.state.hhBeats} 
                    snareBeats={this.state.snareBeats} 
                    kickBeats={this.state.kickBeats}
                    changeHandler={this.beatChangeHandler} 
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
            </>
        )
    }
}

export default Grid