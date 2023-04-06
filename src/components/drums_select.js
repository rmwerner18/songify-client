import React from 'react';
import { useDispatch } from 'react-redux';
import { changeSongAttribute } from '../actions/current_song';
import DRUM_PRESETS from '../constants/drum_presets';

const DrumsSelect = () => {
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    if (e.target.value === 'no preset') {
      dispatch(
        changeSongAttribute({ hhBeats: [], kickBeats: [], snareBeats: [] })
      );
    } else {
      let preset = DRUM_PRESETS[e.target.value];
      dispatch(
        changeSongAttribute({
          hhBeats: [...preset.hhBeats],
          kickBeats: [...preset.kickBeats],
          snareBeats: [...preset.snareBeats],
        })
      );
    }
  };

  const options = () => {
    return DRUM_PRESETS.map((preset, index) => {
      return (
        <option key={index} value={index}>
          Drum Preset {index + 1}
        </option>
      );
    });
  };

  return (
    <select className='drum-preset-select' onChange={(e) => changeHandler(e)}>
      <option value='no preset'>Drum Presets</option>
      <option value='no preset'>None</option>
      {options()}
    </select>
  );
};

export default DrumsSelect;
