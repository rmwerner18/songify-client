import React from 'react';
import * as Tone from 'tone'
import Chord from '../components/chord'


var Octavian = require('octavian')

class Grid extends React.Component {
    state = {
        measures: 12,
        chords: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {bass: "A", name: "A", quality: "major"}
        ],
        quality: ""
      }


    chordProgression = (index, time, synth) => {
        console.log('hello')
        let chords = [
            [293.665, 369.994, 440, 220],
            [493.883, 587.33, 739.989, 830.609, 246.942],
            [369.994, 440, 554.365, 184.997],
            [493.883, 622.254, 739.989, 220],
            [329.628, 415.305, 493.883, 246.942],
            [261.626, 311.127, 369.994, 261.626],
            [329.628, 415.305, 493.883, 246.942],
            [466.164, 554.365, 659.255, 233.082],
            [440, 554.365, 659.255, 220],
            [329.628, 415.305, 493.883, 207.652],
            [369.994, 440, 554.365, 184.997],
            [329.628, 415.305, 493.883, 164.814]
        ]
        if ([0, 1, 2, 3].includes(index)) {
            synth.triggerAttackRelease(chords[0], '0.5', time)
        } else if ([4, 5, 6, 7].includes(index)) {
            synth.triggerAttackRelease(chords[1], '0.5', time)
        } else if ([8, 9, 10, 11].includes(index)) {
            synth.triggerAttackRelease(chords[2], '0.5', time)
        } else if ([12, 13, 14, 15].includes(index)) {
            synth.triggerAttackRelease(chords[3], '0.5', time)
        } else if ([16, 17, 18, 19].includes(index)) {
            synth.triggerAttackRelease(chords[4], '0.5', time)
        } else if ([20, 21, 22, 23].includes(index)) {
            synth.triggerAttackRelease(chords[5], '0.5', time)
        } else if ([24, 25, 26, 27].includes(index)) {
            synth.triggerAttackRelease(chords[6], '0.5', time)
        } else if ([28, 29, 30, 31].includes(index)) {
            synth.triggerAttackRelease(chords[7], '0.5', time)
        } else if ([32, 33, 34, 35].includes(index)) {
            synth.triggerAttackRelease(chords[8], '0.5', time)
        } else if ([36, 37, 38, 39].includes(index)) {
            synth.triggerAttackRelease(chords[9], '0.5', time)
        } else if ([40, 41, 42, 43].includes(index)) {
            synth.triggerAttackRelease(chords[10], '0.5', time)
        } else if ([44, 45, 46, 47].includes(index)) {
            synth.triggerAttackRelease(chords[11], '0.5', time)
        } 
    }

    playGong = (bass, name, qual) => {
        let b = new Octavian.Note(bass)
        let chord = new Octavian.Chord(name, qual)
        let freqs = chord.frequencies
        freqs.push(b.frequency)

        console.log(freqs)
    }
    
    clickHandler = () => {

        let button = document.querySelector("button")
        button.addEventListener('click', e => {
            let array = []
            for (let i=0; i<48; i++) {
                array.push(i)
            }
            const synth = new Tone.PolySynth().toDestination();
            const seq = new Tone.Sequence((time, index) => {
                // synth.triggerAttackRelease(note, 0.1, time);
                this.chordProgression(index, time, synth)
                // subdivisions are given as subarrays
            }, array).start(0);
            Tone.Transport.bpm.value = 60;
            Tone.Transport.start();

            const sampler = new Tone.Sampler({
                urls: {
                  "D#4": "Ds4.mp3",
                  "F#4": "Fs4.mp3",
                  "A4": "A4.mp3",
                },
                release: 1,
                baseUrl: "https://tonejs.github.io/audio/salamander/"
              }).toDestination();


     
        })
      }

    chordSubmitHandler = (e, id, state) => {
        e.preventDefault()
        let newArray = this.state.chords
        newArray.splice(id, 1, state)
        this.setState({chords: newArray})
    }

    showChords = () => {
            return this.state.chords.map((chord, index) => {
                console.log(chord)
                return <Chord id={index} chord={chord} submitHandler={this.chordSubmitHandler}/>
            })
    }

    render() {
        console.log(this.state)
        return (
            <>
                {this.clickHandler()}
                <div className="chord-container">
                    {this.showChords()}
                </div>
            </>
        )
    }
}

export default Grid