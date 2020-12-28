import React from 'react';
import * as Tone from 'tone'
import Chord from '../components/chord'
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import SongNameForm from '../components/song_name_form'
import modes from '../modes'
import defaultChords from '../default_chords'
import chordPresets from '../chord_presets'
import PlayButton from '../components/play_button';
import { setNumOfEigthNotes, startLoop, stopLoop } from '../loop_handling'

class Grid extends React.Component {
    state = {
        user_id: null,
        likes: 0,
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


  player = (index, time) => {
    
    let chords = this.state.chords.map(chord => chord.freqs)
    Tone.Transport.bpm.value = parseInt(this.state.bpm)
    let instrument
    if (this.state.instrument === 'synth') {
      instrument = this.props.state.synth
    } else if (this.state.instrument === 'piano') {
      instrument = this.props.state.piano
    }
    if ([0, 4].includes(index)) {
        instrument.triggerAttackRelease(chords[0], '2n', time)
    } else if ([8, 12].includes(index)) {
        instrument.triggerAttackRelease(chords[1], '2n', time)
    } else if ([16, 20].includes(index)) {
        instrument.triggerAttackRelease(chords[2], '2n', time)
    } else if ([24, 28].includes(index)) {
        instrument.triggerAttackRelease(chords[3], '2n', time)
    } 
    if (this.state.kickBeats.includes(index)) {
        this.props.state.kick.start(time)
    }
    if (this.state.snareBeats.includes(index)) {
        this.props.state.snare.start(time)
    }
    if (this.state.hhBeats.includes(index)) {
        this.props.state.hh.start(time);
    }
    if (this.state.iBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[0], '8n', time)
    }
    if (this.state.iiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[1], '8n', time)
    }
    if (this.state.iiiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[2], '8n', time)
    }
    if (this.state.ivBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[3], '8n', time)
    }
    if (this.state.vBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[4], '8n', time)
    }
    if (this.state.viBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[5], '8n', time)
    }
    if (this.state.viiBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[6], '8n', time)
    }
    if (this.state.IBeats.includes(index)) {
        instrument.triggerAttackRelease(modes[this.state.melodyMode](this.state.melodyKey)[7], '8n', time)
    }
  }

  setNumOfEigthNotes = (n, array) => {
    for (let i=0; i<n; i++) {
        array.push(i)
    }
  }

  startLoop = () => {
    let array = []
    this.setNumOfEigthNotes(32, array)
    new Tone.Sequence((time, index) => {
        this.player(index, time)
    }, array).start(0)
    Tone.Transport.start();
  }

  stopLoop = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
  }

  playHandler = (e) => {
    // HANDLES LOOP
    if (Tone.Transport.state === "stopped") {
        Tone.Destination.context.resume().then(() => {
            this.startLoop()
        })
        e.target.innerHTML = '<span>||</span>'
    } else {
        this.stopLoop()
        e.target.innerHTML = '<span>▶</span>'
    }
  }

    componentDidMount = () => {
        this.stopLoop()
        document.querySelector('.navbar').style.display = 'none'
        if (this.props.song_id) {
            fetch(`http://localhost:3000/songs/${this.props.song_id}`)
            .then(resp => resp.json())
            .then(song => {
                this.setState(song)
            })
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

    beatChangeHandler = (type, obj) => {
        if (type === 'all') {
            this.setState({
                kickBeats: obj.kickBeats,
                snareBeats: obj.snareBeats,
                hhBeats: obj.hhBeats
            })
        } else {
            this.setState({[type]: obj})
        }
    }

    instrumentChangeHandler = (e) => {
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

    saveSongHandler = (e, songname) => {  
        e.preventDefault()
            let newObj
            newObj = this.state
            newObj.user_id = this.props.state.user.id
            newObj.name = songname
            this.props.song_id
            ?
            fetch(`http://localhost:3000/songs/${this.props.song_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    accepts: "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(
                    newObj
                )
            }).then(resp => resp.json())
            .then(() => {
                this.stopLoop()
                alert("Your changes have been saved!")
            })
            :
            fetch('http://localhost:3000/songs', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accepts: "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(
                    newObj
                )
            }).then(resp => resp.json())
            .then(song => alert("Your song has been saved!"))
    }
    

    modalClickHandler = () => {
        Tone.Transport.stop()
        Tone.Transport.cancel()
        document.getElementById("grid-start-button").innerHTML = "<span>▶</span>"
        if (this.props.state.user.id) {
            document.getElementById(`song-name-form-modal`).style.display = "block"
        } else {
            alert('Please login to save a song')
        }
    }

    modalCloseHandler = () => {
        document.getElementById(`song-name-form-modal`).style.display = "none"
    }

 
    render() {
        return (
            <>
                <div id={`song-name-form-modal`} className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.modalCloseHandler}>&times;</span>
                        <div>
                            {<SongNameForm submitHandler={this.saveSongHandler}/>}
                        </div>
                    </div>
                </div>
                {this.props.song_id
                ?
                <h1>Edit {this.state.name}</h1>
                :
                <h1>Create a Song</h1>
                }
                <div className="song-maker-container">
                    <div className="chord-container">
                        {this.showChords()}
                    </div>
                    <div className='chord-options'>
                        {/* <PlayButton clickHandler={this.playHandler} /> */}
                        <div className='grid-start-button-container'>
                            <button id='grid-start-button' onClick={(e) => this.playHandler(e)}><span>▶</span></button>
                        </div>
                        <div className='save-container' >
                            <button className='save-button' onClick={this.props.song_id ? this.saveSongHandler : this.modalClickHandler}><span>Save</span></button>
                        </div>
                        <div className='random-chords-button-container'>
                            <button className='random-chords-button' onClick={this.randomProgGenereator}><span>Randomize Chords</span></button>
                        </div>
                    </div>
                    <div className='playback-options'>
                        <TempoForm bpm={this.state.bpm} changeHandler={this.tempoChangeHandler} />
                        <InstrumentForm changeHandler={this.instrumentChangeHandler}/>
                    </div>
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
                        song_id={this.props.song_id ? this.props.song_id : null}
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
                </div>
            </>
        )
    }
}

export default Grid