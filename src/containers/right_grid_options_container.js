import React from 'react';
import SaveButton from '../components/save_button';
import GridPlayButton from '../components/play_buttons/grid_play_button';
import RandomProgButton from '../components/random_prog_button';
import TempoForm from '../components/tempo_form';
import InstrumentForm from '../components/instrument_form';
import MelodyOptions from '../components/melody_options';
import BeatSelect from '../components/beat_select';
import VolumeForm from '../components/volume_form';
import SwingForm from '../components/swing_form';

const RightGridOptionsContainer = (props) => {
  return (
    <div className='grid-options-container'>
      <div className='grid-options'>
        <span>Chords:</span>
        <RandomProgButton />
        <InstrumentForm instrumentType={ 'instrument' }/>
        <span>Drums:</span>
        <BeatSelect />
        <span>Melody:</span>
        <MelodyOptions />
      </div>
    </div>
  );
};

export default RightGridOptionsContainer;
