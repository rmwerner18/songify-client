import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChordCheckbox from '../../components/checkboxes/chord_checkbox';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';
import { addOrRemoveBeat } from '../../helper_functions/add_or_remove_beat';
import { changeSongAttribute } from '../../actions/change_song_attribute';

const ChordCheckboxRow = ({ beatType }) => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.currentSong['chords']);
  const [beatObject, setBeatObject] = useState({
    startBeat: null,
    duration: 0,
  });

  const changeHandler = (id, checked, duration, resize = false) => {
    const newBeatObject = { startBeat: id, duration };
    const payload = {};
    if (checked && !resize) {
      delete chords[newBeatObject.startBeat];
    } else
      chords[newBeatObject.startBeat] = { duration: newBeatObject.duration };
    payload[beatType] = { ...chords };
    dispatch(changeSongAttribute(payload));
  };

  return (
    <div className='checkbox-row'>
      {numberOfBeatsArray.map((n) => {
        return (
          <ChordCheckbox
            key={n}
            beatType={beatType}
            n={n}
            beat={chords[n]}
            checked={Object.keys(chords).includes(n.toString())}
            changeHandler={changeHandler}
            beatObject={beatObject}
            setBeatObject={setBeatObject}
          />
        );
      })}
    </div>
  );
};

export default ChordCheckboxRow;
