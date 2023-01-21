import React from 'react'
import SaveButton from '../components/save_button'
import GridPlayButton from '../components/play_buttons/grid_play_button'
import RandomProgButton from '../components/random_prog_button'
import TempoForm from '../components/tempo_form'
import InstrumentForm from '../components/instrument_form'
import MelodyOptions from '../components/melody_options'
import BeatSelect from '../components/beat_select'
import VolumeForm from '../components/volume_form'
import SwingForm from '../components/swing_form'

const GridOptionsContainer = props => {
 return (
 <div className='grid-options-container'>
   <div className='grid-options'>
    <GridPlayButton />
    <RandomProgButton />
    <InstrumentForm />
    <BeatSelect />
    <MelodyOptions />
    <TempoForm />
    <VolumeForm />
    <SwingForm />
    <SaveButton song_id={ props.song_id } />
   </div>
  </div> 
 )
}

export default GridOptionsContainer