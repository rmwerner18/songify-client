import React from 'react';
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import RandomProgButton from '../components/random_prog_button'
import PlayButton from '../components/play_button'
import SaveButton from '../components/save_button'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { endNowPlaying } from '../actions/end_now_playing'
import { hideNavbar } from '../actions/hide_navbar'
import { setCurrentSong } from '../actions/set_current_song'
import { connect } from 'react-redux'
import ChordsContainer from './chords_container';

const Grid = props => {

    const fetchSongToEdit = () => {
        if (props.song_id) {
            fetch(`http://localhost:3000/songs/${props.song_id}`)
            .then(resp => resp.json())
            .then(song => {
                props.setCurrentSong(song)
            })
        }
    }
    
    stopLoop()
    props.endNowPlaying()
    props.hideNavbar()
    fetchSongToEdit()

    return (
        <>
            {props.song_id ? <h1>Edit</h1> : <h1>Create a Song</h1>}
            <div className='song-maker-page'>
                <div className="song-maker-container">
                    <ChordsContainer/>
                    <BeatForm/>
                    <MelodyForm/>
                </div>
                
                <div className='song-options-container'>
                    <div className='chord-options'>
                        <PlayButton/>
                        <SaveButton song_id={props.song_id}/>
                        <RandomProgButton/>
                    </div>

                    <div className='playback-options'>
                        <TempoForm />
                        <InstrumentForm/>
                    </div>
                </div>

            </div>
        </>
    )
}

const mapDispatchToProps = { 
    endNowPlaying, 
    hideNavbar, 
    setCurrentSong 
}

export default connect(null, mapDispatchToProps)(Grid)