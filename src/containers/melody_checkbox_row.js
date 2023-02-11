import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MelodyCheckbox from '../components/melody_checkbox';
import { numberOfBeatsArray } from '../helper_functions/make_beat_array';
import { addOrRemoveBeat } from '../helper_functions/add_or_remove_beat';
import { changeSongAttribute } from '../actions/change_song_attribute';

const MelodyCheckboxRow = ({ beatType }) => {
  const dispatch = useDispatch();
  const rowBeats = useSelector((state) => state.currentSong[beatType]);
  const [beatObject, setBeatObject] = useState({
    startBeat: null,
    duration: 0,
  });

  const changeHandler = (id, checked, duration, resize = false) => {
    const newBeatObject = { startBeat: id, duration };
    const payload = {};
    if (checked && !resize) {
      delete rowBeats[newBeatObject.startBeat];
    } else
      rowBeats[newBeatObject.startBeat] = { duration: newBeatObject.duration };
    payload[beatType] = { ...rowBeats };
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
            beat={rowBeats[n]}
            checked={Object.keys(rowBeats).includes(n.toString())}
            changeHandler={changeHandler}
            beatObject={beatObject}
            setBeatObject={setBeatObject}
          />
        );
      })}
    </div>
  );
};

export default MelodyCheckboxRow;
