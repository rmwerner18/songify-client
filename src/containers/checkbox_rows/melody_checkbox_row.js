import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MelodyCheckbox from '../../components/checkboxes/melody_checkbox';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';
import { changeSongAttribute } from '../../actions/change_song_attribute';

const MelodyCheckboxRow = ({ beatType }) => {
  const dispatch = useDispatch();
  const rowBeats = useSelector((state) => state.currentSong[beatType]);

  const changeHandler = (n, checked) => {
    if (checked) {
      delete rowBeats[n];
    } else
      rowBeats[n] = { duration: 1 };
    dispatchBeatChange(rowBeats)
  };

  const resizeHandler = (n, duration) => {
    rowBeats[n]['duration'] = duration;
    dispatchBeatChange(rowBeats);
  };

  const dispatchBeatChange = (rowBeats) => {
    const payload = {};
    payload[beatType] = { ...rowBeats };
    dispatch(changeSongAttribute(payload));
  };

  return (
    <div className='checkbox-row'>
      {numberOfBeatsArray.map((n) => {
        return (
          <MelodyCheckbox
            key={n}
            n={n}
            beat={rowBeats[n]}
            checked={Object.keys(rowBeats).includes(n.toString())}
            changeHandler={changeHandler}
            resizeHandler={resizeHandler}
          />
        );
      })}
    </div>
  );
};

export default MelodyCheckboxRow;
