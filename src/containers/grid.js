import React from 'react';
import BeatForm from '../components/beat_form'
import MelodyForm from '../components/melody_form'
import { stopLoop } from '../helper_functions.js/stop_loop'
import { endNowPlaying } from '../actions/end_now_playing'
import DEFAULT_SONG_STATE from '../constants/default_song_state';
import { setCurrentSong } from '../actions/set_current_song'
import { connect } from 'react-redux'
import ChordsContainer from './chords_container';
import DEFAULT_CHORDS from '../constants/default_chords';

const Grid = props => {
    // const DEFAULT_SONG_STATE = {
    //     id: null,
    //     user_id: null,
    //     likes: 0,
    //     chords: DEFAULT_CHORDS,
    //     bpm: 100,
    //     snareBeats: [],
    //     kickBeats: [],
    //     hhBeats: [],
    //     instrument: "piano",
    //     iBeats: [],
    //     iiBeats: [],
    //     iiiBeats: [],
    //     ivBeats: [],
    //     vBeats: [],
    //     viBeats: [],
    //     viiBeats: [],
    //     IBeats: [],
    //     melodyKey: "C5",
    //     melodyMode: "ionian",
    //     isPlaying: false
    //    }

    console.log('0', DEFAULT_SONG_STATE)
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
    console.log('1', DEFAULT_SONG_STATE)
    props.setCurrentSong(DEFAULT_SONG_STATE)
    console.log('2', DEFAULT_SONG_STATE)
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
    setCurrentSong 
}

export default connect(null, mapDispatchToProps)(Grid)