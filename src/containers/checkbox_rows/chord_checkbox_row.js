import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChordCheckbox from '../../components/checkboxes/chord_checkbox';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';
import { changeSongAttribute } from '../../actions/change_song_attribute';
import omit from 'lodash/omit';

const ChordCheckboxRow = () => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.currentSong.chords);

  const changeHandler = (start_beat, checked, chordNameBassAndQuality) => {
    const payload = { chords: { ...chords } };
    if (checked) {
      delete payload.chords[start_beat];
    } else {
      payload.chords[start_beat] = {
        ...chordNameBassAndQuality,
        duration: 1,
        start_beat,
      };
    }
    dispatch(changeSongAttribute(payload));
  };

  const resizeHandler = (startBeat, duration) => {
    const payload = { chords: { ...chords } };
    payload.chords[startBeat] = { ...payload.chords[startBeat], duration };
    dispatch(changeSongAttribute(payload));
  };

  console.log(chords)

  return (
    <div className='checkbox-row'>
      {numberOfBeatsArray.map((beat) => {
        return (
          <ChordCheckbox
            key={beat}
            beat={beat}
            beatObject={chords[beat]}
            checked={chords[beat]}
            changeHandler={changeHandler}
            resizeHandler={resizeHandler}
          />
        );
      })}
    </div>
  );
};

export default ChordCheckboxRow;
