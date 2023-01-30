import React from 'react';
import { changeSongAttribute } from '../actions/change_song_attribute';
import { useDispatch, useSelector } from 'react-redux';
import InstrumentForm from './instrument_form';

const MelodyOptions = () => {
  const dispatch = useDispatch();

  const melodyKey = useSelector((state) => state.currentSong.melodyKey);
  const melodyMode = useSelector((state) => state.currentSong.melodyMode);

  const keyRoots = [
    'C5',
    'C#5',
    'D5',
    'D#5',
    'E5',
    'F5',
    'F#5',
    'G5',
    'G#5',
    'A5',
    'A#5',
    'B5',
  ];

  const modes = [
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian',
  ];

  const removeNumber = (string) => {
    let newString = string.split('');
    newString.pop();
    return newString.join('');
  };
  const rootOptions = () => {
    return keyRoots.map((root) => (
      <option
        key={root}
        value={root}
        selected={
          removeNumber(melodyKey) === removeNumber(root) ? 'selected' : null
        }
      >
        {removeNumber(root)}
      </option>
    ));
  };
  const modeOptions = () => {
    return modes.map((mode) => (
      <option
        key={mode}
        selected={melodyMode === mode ? 'selected' : null}
        value={mode}
      >
        {mode}
      </option>
    ));
  };

  const clearedBeats = {
    iBeats: [],
    iiBeats: [],
    iiiBeats: [],
    ivBeats: [],
    vBeats: [],
    viBeats: [],
    viiBeats: [],
    IBeats: [],
  };

  return (
    <div>
      <select
        onChange={(e) =>
          dispatch(changeSongAttribute({ melodyKey: e.target.value }))
        }
      >
        {rootOptions()}
      </select>
      <select
        onChange={(e) =>
          dispatch(changeSongAttribute({ melodyMode: e.target.value }))
        }
      >
        {modeOptions()}
      </select>
      <InstrumentForm instrumentType={'melodyInstrument'} />
      <button
        className='button'
        onClick={() => dispatch(changeSongAttribute(clearedBeats))}
      >
        Clear Melody
      </button>
    </div>
  );
};

export default MelodyOptions;
