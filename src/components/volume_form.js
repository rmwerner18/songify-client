import React, { useState } from 'react';
import { Slider } from '@mantine/core';
import * as Tone from 'tone';

const VolumeForm = () => {
  const [volume, setVolume] = useState(-30);
  Tone.Destination.volume.value = volume;

  return (
    <div className='volume-form'>
      <p className='volume-meter'>volume: </p>
      <Slider
        color='spotify-green'
        min={-70}
        max={0}
        scale={(v) => v + 70}
        value={volume}
        onChange={setVolume}
      />
    </div>
  );
};

export default VolumeForm;
