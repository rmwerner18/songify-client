import React from 'react';
import TempoForm from '../components/tempo_form'
import BeatForm from '../components/beat_form'
import InstrumentForm from '../components/instrument_form'
import MelodyForm from '../components/melody_form'
import MelodyOptions from '../components/melody_options'
import RandomProgButton from '../components/random_prog_button'
import SaveButton from '../components/save_button'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { endNowPlaying } from '../actions/end_now_playing'
import { hideNavbar } from '../actions/hide_navbar'
import DEFAULT_SONG_STATE from '../constants/default_song_state';
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
    props.setCurrentSong(DEFAULT_SONG_STATE)
    // props.hideNavbar()
    fetchSongToEdit()

    return (
        <>
            <div className='grid'>
                <div className='bar-labels'>
                    <p className='bar-label'>Bar 1</p>
                    <p className='bar-label'>Bar 2</p>
                    <p className='bar-label'>Bar 3</p>
                    <p className='bar-label last'>Bar 4</p>
                </div>
                <div className="grid-container">
                    <p className='part-label'>Chords</p>
                    <ChordsContainer/>
                    <p className='part-label'>Drums</p>
                    <BeatForm/>
                    <p className='part-label'>Melody</p>
                    <MelodyForm/>
                </div> 
            </div>
        </>
    )
}

const mapDispatchToProps = { 
    endNowPlaying, 
    // hideNavbar, 
    setCurrentSong 
}

export default connect(null, mapDispatchToProps)(Grid)