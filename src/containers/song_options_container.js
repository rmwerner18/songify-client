import React from 'react'
import SaveButton from '../components/save_button'
import PlayButton from '../components/play_button'
import RandomProgButton from '../components/random_prog_button'
import TempoForm from '../components/tempo_form'
import InstrumentForm from '../components/instrument_form'
import MelodyOptions from '../components/melody_options'
import BeatSelect from '../components/beat_select'

const SongOptionsContainer = props => {
 return (
 <div className='song-options-container'>
   <div className='chord-options'>
    <PlayButton />
    <RandomProgButton />
    <BeatSelect />
    <MelodyOptions />
    <TempoForm />
    <InstrumentForm />
    <SaveButton song_id={ props.song_id } />
   </div>
  </div> 
 )
}

export default SongOptionsContainer