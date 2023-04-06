import React from 'react';
import { Slider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { changeSongAttribute } from '../actions/current_song';

const TempoForm = () => {
  const bpm = useSelector((state) => state.currentSong.bpm);
  const dispatch = useDispatch();

  return (
    <div className='tempo-form'>
      <p className='bpm-meter'>bpm: </p>
      <Slider
        color='spotify-green'
        min={30}
        max={300}
        value={bpm}
        onChange={(value) => dispatch(changeSongAttribute({ bpm: value }))}
      />
    </div>
  );
};

export default TempoForm;
