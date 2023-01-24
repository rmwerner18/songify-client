import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSongAttribute } from '../actions/change_song_attribute';
import * as Tone from 'tone';

const SwingForm = () => {
  const swing = useSelector((state) => state.currentSong.swing);
  const [swingState, setSwingState] = useState(swing);
  const dispatch = useDispatch();
  Tone.Transport.swing = swingState;

  const changeHandler = (e) => {
    if (isNaN(e.target.value)) {
      return;
    }
    setSwingState(e.target.value * 0.01);
  };

  return (
    <div className='swing-form'>
      <p className='swing-meter'>swing</p>
      <input
        type='range'
        min='0'
        max='100'
        value={swingState * 100}
        onChange={changeHandler}
        onPointerUp={() => dispatch(changeSongAttribute({ swing: swingState }))}
      />
    </div>
  );
};

export default SwingForm;
