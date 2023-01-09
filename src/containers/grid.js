import React from 'react';
import BeatForm from '../components/beat_form';
import MelodyForm from '../components/melody_form';
import { setCurrentSong } from '../actions/set_current_song';
import { useDispatch } from 'react-redux';
import ChordsContainer from './chords_container';

const Grid = props => {
    const dispatch = useDispatch()

    const fetchSongToEdit = () => {
        if (props.song_id) {
            fetch(`http://localhost:3000/songs/${props.song_id}`)
            .then(resp => resp.json())
            .then(song => {
                dispatch(setCurrentSong(song))
            })
        }
    }

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

export default Grid