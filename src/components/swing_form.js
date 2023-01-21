import React, { useState } from 'react'
import * as Tone from 'tone'

const SwingForm = () => {
 const [swing, setSwing] = useState(0)
 Tone.Transport.swing = swing

 const changeHandler = e => {
  setSwing(e.target.value * 0.01)
 }

 return (
  <div className='swing-form'>
   <p className='swing-meter'>swing</p>
   <input type='range' min='0' max='100' value={swing * 100} onChange={changeHandler}/>
  </div>
 )
}

export default SwingForm