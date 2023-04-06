import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSongAttribute } from '../actions/current_song';
import * as Tone from 'tone';
import { Slider } from '@mantine/core';

const SwingForm = () => {
  const swing = useSelector((state) => state.currentSong.swing);
  const dispatch = useDispatch();

  return (
    <div className='swing-form'>
      <p className='swing-meter'>swing: </p>
      <Slider
        color='spotify-green'
        min={0}
        max={1}
        scale={(value) => value * 100}
        step={0.01}
        value={swing}
        onChange={(value) => dispatch(changeSongAttribute({ swing: value }))}
        label={(value) => Math.round(value)}
      />
    </div>
  );
};

export default SwingForm;
