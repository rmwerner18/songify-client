import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChordCheckbox from '../../components/checkboxes/chord_checkbox';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';
import { addOrRemoveBeat } from '../../helper_functions/add_or_remove_beat';
import { changeSongAttribute } from '../../actions/change_song_attribute';
import omit from 'lodash/omit';

const ChordCheckboxRow = () => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.currentSong.chords);

  const changeHandler = (n, checked, duration, resize = false) => {
    const payload = {};

    if (checked) {
      if (resize) {
        chords[n]['duration'] = duration;
      } else delete chords[n];
    } else {
      chords[n] = {
        name: 'C4',
        bass: 'C3',
        quality: 'majorSeventh',
        duration: 1,
      };
    }

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
          />
        );
      })}
    </div>
  );
};

export default ChordCheckboxRow;
