import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSongAttribute } from '../actions/change_song_attribute';
import * as Tone from 'tone';
import { Slider } from '@mantine/core';

const SwingForm = () => {
  const swing = useSelector((state) => state.currentSong.swing);
  const [swingState, setSwingState] = useState(swing);
  const dispatch = useDispatch();
  Tone.Transport.swing = swingState;

  const valueLabelFormat = (value) => Math.round(value);

  return (
    <div className='swing-form'>
      <p className='swing-meter'>swing: </p>
      <Slider
        color='spotify-green'
        min={0}
        max={1}
        scale={(v) => v * 100}
        step={0.01}
        value={swingState}
        onChange={setSwingState}
        label={valueLabelFormat}
        onChangeEnd={dispatch(changeSongAttribute({ swing: swingState }))}
      />
    </div>
  );
};

export default SwingForm;
