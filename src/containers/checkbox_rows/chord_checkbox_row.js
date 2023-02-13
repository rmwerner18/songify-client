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
    if (checked) {
      delete chords[n];
    } else {
      chords[n] = {
        ...chordNameBassAndQuality,
        duration: 1,
      };
    }
    dispatchChordsChange(chords);
  };

  const resizeHandler = (n, duration) => {
    chords[n]['duration'] = duration;
    dispatchChordsChange(chords);
  };

  const dispatchChordsChange = (chords) => {
    const payload = {};
    payload['chords'] = { ...chords };
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
