import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChordCheckbox from '../../components/checkboxes/chord_checkbox';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';
import { changeSongAttribute } from '../../actions/change_song_attribute';
import omit from 'lodash/omit';

const ChordCheckboxRow = () => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.currentSong.chords);

  const changeHandler = (n, checked, chordNameBassAndQuality) => {
    const payload = { chords: { ...chords } };
    if (checked) {
      delete payload.chords[n];
    } else {
      payload.chords[n] = {
        ...chordNameBassAndQuality,
        duration: 1,
      };
    }
    console.log(chords);
    dispatch(changeSongAttribute(payload));
  };

  const resizeHandler = (n, duration) => {
    const payload = { chords: { ...chords } };
    payload.chords[n] = { ...payload.chords[n], duration };
    console.log(chords);
    dispatch(changeSongAttribute(payload));
  };

  return (
    <div className='checkbox-row'>
      {numberOfBeatsArray.map((n) => {
        return (
          <ChordCheckbox
            key={n}
            n={n}
            beat={chords[n]}
            checked={Object.keys(chords).includes(n.toString())}
            changeHandler={changeHandler}
            resizeHandler={resizeHandler}
          />
        );
      })}
    </div>
  );
};

export default ChordCheckboxRow;
