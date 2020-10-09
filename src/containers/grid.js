import React from 'react';
import * as Tone from 'tone'
import Chord from '../components/chord'
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'

class Grid extends React.Component {
    state = {
        measures: 12,
        chords: [
            {
                bass: "",
                name: "A4", 
                quality: "majorSeventh", 
                freqs: [440, 554.365, 659.255, 830.609, 220],
                formattedBass: "",
                formattedName: "A",
                formattedQuality: "maj7"
            }, 
            {
                bass: "",
                name: "E4", 
                quality: "dominantSeventh", 
                freqs: [329.628, 415.305, 493.883, 587.33, 164.814],
                formattedBass: "",
                formattedName: "E",
                formattedQuality: "7"
            },
            {
                bass: "",
                name: "F#4", 
                quality: "minorSeventh", 
                freqs: [369.994, 440, 554.365, 659.255, 184.997],
                formattedBass: "",
                formattedName: "F#",
                formattedQuality: "m7"
            },
            {
                bass: "",
                name: "D4", 
                quality: "majorSeventh", 
                freqs: [293.665, 369.994, 440, 554.365, 146.832],
                formattedBass: "",
                formattedName: "D",
                formattedQuality: "maj7"
            }
        ],
        bpm: 100,
        snareBeats: [],
        kickBeats: [],
        hhBeats: []
      }


    chordProgression = (index, time, synth, snare, kick, hh) => {
        let chords = this.state.chords.map(chord => chord.freqs)
        Tone.Transport.bpm.value = parseInt(this.state.bpm)
        if ([0,4 ].includes(index)) {
            synth.triggerAttackRelease(chords[0], '2n', time)
        } else if ([8, 12].includes(index)) {
            synth.triggerAttackRelease(chords[1], '2n', time)
        } else if ([16,20].includes(index)) {
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

        // else if ([16, 17, 18, 19].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[4].freqs, '0.5', time)
        // } else if ([20, 21, 22, 23].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[5].freqs, '0.5', time)
        // } else if ([24, 25, 26, 27].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[6].freqs, '0.5', time)
        // } else if ([28, 29, 30, 31].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[7].freqs, '0.5', time)
        // } else if ([32, 33, 34, 35].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[8].freqs, '0.5', time)
        // } else if ([36, 37, 38, 39].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[9].freqs, '0.5', time)
        // } else if ([40, 41, 42, 43].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[10].freqs, '0.5', time)
        // } else if ([44, 45, 46, 47].includes(index)) {
        //     synth.triggerAttackRelease(this.state.chords[11].freqs, '0.5', time)
        // } 
    }

    setNumOfEigthNotes = (n, array) => {
        for (let i=0; i<n; i++) {
            array.push(i)
        }
    }

    startLoop = () => {
        const gong = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
        const snare = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/snare.wav").toDestination();
        const kick = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav").toDestination();
        const hh = new Tone.Player("https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-close.wav").toDestination();
        const sampler = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

        let array = []
        this.setNumOfEigthNotes(32, array)
        const synth = new Tone.PolySynth().toDestination();
        Tone.loaded().then(() => {
            const seq = new Tone.Sequence((time, index) => {
                this.chordProgression(index, time, sampler, snare, kick, hh)
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
        // if (type === 'hhBeats') {
        //     this.setState({hhBeats: array})
        // } else if (type === 'snareBeats') {
        //     this.setState({snareBeats: array})
        // } else if 
        this.setState({[type]: array})
    }

    render() {
        console.log("snare:", this.state.snareBeats)
        // console.log(this.state.kickBeats)
        console.log("hh:", this.state.hhBeats)
        return (
            <>
                <div className="chord-container">
                    {this.showChords()}
                </div>
                <button onClick={this.clickHandler}>start</button>
                <TempoForm bpm={this.state.bpm} changeHandler={this.tempoChangeHandler} />
                <BeatForm changeHandler={this.beatChangeHandler}/>
            </>
        )
    }
}

export default Grid