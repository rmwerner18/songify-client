import React from 'react';
import * as Tone from 'tone'
import Chord from '../components/chord'
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import SongNameForm from '../components/song_name_form'
import chordPresets from '../chord_presets'
import { setNumOfEigthNotes } from '../helper_functions.js/set_num_of_eigth_notes'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { changeAllChords } from '../actions/change_all_chords'
import { setNowPlaying } from '../actions/set_now_playing'
import { endNowPlaying } from '../actions/end_now_playing'
import { hideNavbar } from '../actions/hide_navbar'
import player from '../player'
import { connect } from 'react-redux'

class Grid extends React.Component {
    state = {
        modalIsOpen: false
    }
    
    playerCaller = (index, time) => {
        let newObj = Object.assign({}, this.props.sounds, this.props.song)
        return player(index, time, newObj)
    }

    startLoop = () => {
        let array = []
        setNumOfEigthNotes(32, array)
        new Tone.Sequence((time, index) => {
            this.playerCaller(index, time)
        }, array).start(0)
        Tone.Transport.start();
    }

    playHandler = (e) => {
        if (Tone.Transport.state === "stopped") {
            Tone.Destination.context.resume().then(() => {
                this.startLoop()
            })
            this.props.setNowPlaying({song: 'current song'})
        } else {
            stopLoop()
            this.props.endNowPlaying()
        }
    }

    componentDidMount = () => {
        stopLoop()
        this.props.hideNavbar()
        this.props.endNowPlaying()
        if (this.props.song_id) {
            fetch(`http://localhost:3000/songs/${this.props.song_id}`)
            .then(resp => resp.json())
            .then(song => {
                this.setState(song)
            })
        }
    }

    showChords = () => {
        return this.props.song.chords.map((chord, index) => {
            return <Chord id={index} key={index}/>
        })
    }

    randomProgGenereator = () => {
        let max = chordPresets.length
        let int =  Math.floor(Math.random() * Math.floor(max));
        this.props.changeAllChords(chordPresets[int])
    }

    saveSongHandler = (e, songname) => {  
        e.preventDefault()
            let newObj
            newObj = this.props.song
            newObj.user_id = this.props.user.id
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
                stopLoop()
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
            .then(song => {
                if (song.id) {
                    alert("Your song has been saved!")
                }
            })
    }
    

    modalClickHandler = () => {
        stopLoop()
        this.props.endNowPlaying()
        if (this.props.user.id) {
            this.setState({modalIsOpen: true})
        } else {
            alert('Please login to save a song')
        }
    }

    modalCloseHandler = () => {
        this.setState({modalIsOpen: false})
    }

 
    render() {
        console.log(this.props.nowPlaying)
        return (
            <>
                {this.state.modalIsOpen 
                ?
                <div id={`song-name-form-modal`} className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.modalCloseHandler}>&times;</span>
                        <div>
                            {<SongNameForm submitHandler={this.saveSongHandler}/>}
                        </div>
                    </div>
                </div>
                :
                null       
                }
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
                        <div className='grid-start-button-container'>
                            <button id='grid-start-button' onClick={(e) => this.playHandler(e)}>
                                    {this.props.nowPlaying.song ? <span>||</span> : <span>▶</span>}
                            </button>
                        </div>
                        <div className='save-container' >
                            <button className='save-button' onClick={this.props.song_id ? this.saveSongHandler : this.modalClickHandler}><span>Save</span></button>
                        </div>
                        <div className='random-chords-button-container'>
                            <button className='random-chords-button' onClick={this.randomProgGenereator}><span>Randomize Chords</span></button>
                        </div>
                    </div>
                    <div className='playback-options'>
                        <TempoForm />
                        <InstrumentForm/>
                    </div>
                    <BeatForm/>
                    <br/>
                    <br/>
                    <MelodyForm/>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        sounds: state.sounds,
        song: state.currentSong,
        user: state.user,
        nowPlaying: state.nowPlaying
    }
}

export default connect(mapStateToProps, { changeAllChords, setNowPlaying, endNowPlaying, hideNavbar })(Grid)