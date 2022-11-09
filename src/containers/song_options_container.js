import React from 'react'
import SaveButton from '../components/save_button'
import PlayButton from '../components/play_button'
import RandomProgButton from '../components/random_prog_button'
import TempoForm from '../components/tempo_form'
import InstrumentForm from '../components/instrument_form'
import MelodyOptions from '../components/melody_options'

const SongOptionsContainer = props => {
 return (
  <div className='song-options-container'>
   <div className='chord-options'>
    <SaveButton song_id={props.song_id}/>
    <PlayButton/>
    <RandomProgButton/>
    <TempoForm />
    <InstrumentForm/>
    <MelodyOptions/>
   </div>
  </div> 
 )
}

export default SongOptionsContainer