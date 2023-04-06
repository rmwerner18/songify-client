import React, { useState } from 'react';
import DrumsForm from '../components/drums_form';
import MelodyForm from '../components/melody_form';
import { setCurrentSong } from '../actions/current_song';
import { useDispatch } from 'react-redux';
import ChordsContainer from './chords_container';
import BASE_API_URL from '../constants/base_api_url';
import GridPlayButton from '../components/play_buttons/grid_play_button';
import InstrumentForm from '../components/instrument_form';
import DrumsSelect from '../components/drums_select';
import MelodyOptions from '../components/melody_options';
import TempoForm from '../components/tempo_form';
import SwingForm from '../components/swing_form';
import VolumeForm from '../components/volume_form';
import SaveButton from '../components/save_button';
import ChordForm from '../components/chord_form';
import LoadingPage from '../components/loading_page';
import { keyBy } from 'lodash';

const Grid = (props) => {
  const dispatch = useDispatch();
  const [songToEditIsLoaded, setSongToEditIsLoaded] = useState(false);

  const fetchSongToEdit = () => {
    if (props.song_id) {
      fetch(BASE_API_URL + `songs/${props.song_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((resp) => resp.json())
        .then((song) => {
          song.chords = keyBy(song.chords, 'start_beat');
          dispatch(setCurrentSong(song));
          setSongToEditIsLoaded(true);
        });
    }
  };

  fetchSongToEdit();

  return (
    <>
      {props.song_id && !songToEditIsLoaded ? (
        <LoadingPage />
      ) : (
        <div className='grid'>
          <div className='bar-labels'>
            <p className='bar-label'>Bar 1</p>
            <p className='bar-label'>Bar 2</p>
            <p className='bar-label'>Bar 3</p>
            <p className='bar-label last'>Bar 4</p>
          </div>
          <div className='grid-container'>
            <GridPlayButton />
            <div className='part-label'>
              <p>CHORDS</p>
              <InstrumentForm instrumentType={'instrument'} />
              <ChordForm />
            </div>
            <ChordsContainer />
            <div className='part-label'>
              <p>DRUMS</p>
              <DrumsSelect />
            </div>
            <DrumsForm />
            <div className='part-label'>
              <p>MELODY</p>
              <MelodyOptions />
            </div>
            <MelodyForm />
            <div className='range-options'>
              <TempoForm />
              <VolumeForm />
              <SwingForm />
            </div>
          </div>
          <SaveButton song_id={props.song_id} />
        </div>
      )}
    </>
  );
};

export default Grid;
