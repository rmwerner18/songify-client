import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MelodyCheckbox from '../components/melody_checkbox';
import { numberOfBeatsArray } from '../helper_functions/make_beat_array';
import { addOrRemoveBeat } from '../helper_functions/add_or_remove_beat';
import { changeSongAttribute } from '../actions/change_song_attribute';

const MelodyCheckboxRow = ({
  beatType,
  beatObject,
  dragEnterHandler,
  dragStartHandler,
  dragEndHandler,
}) => {
  const dispatch = useDispatch();
  const rowBeats = useSelector((state) => state.currentSong[beatType]);

  const changeHandler = (e) => {
    const { id } = e.target;
    const newBeatArray = addOrRemoveBeat(rowBeats, id);
    const payload = {};
    payload[beatType] = [...newBeatArray];
    dispatch(changeSongAttribute(payload));
  };

  return (
    <div className='checkbox-row'>
      {numberOfBeatsArray.map((n) => {
        return (
          <MelodyCheckbox
            key={n}
            beatType={beatType}
            n={n}
            checked={rowBeats.includes(n)}
            changeHandler={changeHandler}
            dragStartHandler={dragStartHandler}
            dragEnterHandler={dragEnterHandler}
            dragEndHandler={dragEndHandler}
          />
        );
      })}
    </div>
  );
};

export default MelodyCheckboxRow;
