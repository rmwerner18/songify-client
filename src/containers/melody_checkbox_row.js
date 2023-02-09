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

  // const changeHandler = (e) => {
  //   const { id } = e.target;
  //   console.log(e.target)
  //   const newBeatArray = addOrRemoveBeat(rowBeats, id);
  //   const payload = {};
  //   payload[beatType] = [...newBeatArray];
  //   dispatch(changeSongAttribute(payload));
  // };

  // const mouseUpHandler = (e, n, checkboxBeatType, checked) => {
  //   if (checkboxBeatType === beatObject.beatType) {
  //     console.log('condition passed');
  //     beatObject = {
  //       ...beatObject,
  //       duration: n + 1 - beatObject.startBeat,
  //     };
  //   } else beatObject = {};
  //   setMouseDown(false);
  //   changeHandler(e, checked);
  // };

  // const rowMouseDownHandler = (n, beatType) => {
  //   mouseDownHandler(n, beatType);
  //   setMouseDown(true);
  // };

  const changeHandler = (e, checked) => {
    console.log(e)
    const { id } = e.target;
    const newBeatObject = { startBeat: id, duration: 1 };
    const payload = {};
    if (checked) {
      // console.log('checked case');
      delete rowBeats[newBeatObject.startBeat];
    } else
      rowBeats[newBeatObject.startBeat] = { duration: newBeatObject.duration };
    payload[beatType] = { ...rowBeats };
    // console.log(payload);
    dispatch(changeSongAttribute(payload));
  };

  // console.log(JSON.stringify(rowBeats))

  return (
    <div className='checkbox-row'>
      {numberOfBeatsArray.map((n) => {
        return (
          <MelodyCheckbox
            key={n}
            beatType={beatType}
            n={n}
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
