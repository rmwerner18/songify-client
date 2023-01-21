import React, { useState } from 'react'
import * as Tone from 'tone'

const VolumeForm = () => {
 const [volume, setVolume] = useState(null)
 Tone.Destination.volume.value = volume || -30

 const changeHandler = e => {
  setVolume(e.target.value)
 }

 return (
  <div className='volume-form'>
   <p className='volume-meter'>volume</p>
   <input type='range' min='-70' max='1' value={volume || -30} onChange={changeHandler}/>
  </div>
)
}

export default VolumeForm