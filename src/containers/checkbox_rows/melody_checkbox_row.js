import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MelodyCheckbox from '../../components/checkboxes/melody_checkbox';
import { numberOfBeatsArray } from '../../helper_functions/make_beat_array';
import { changeSongAttribute } from '../../actions/change_song_attribute';
import modes from '../../constants/modes';

const MelodyCheckboxRow = ({ beatType, scaleIndex }) => {
  const dispatch = useDispatch();
  const rowBeats = useSelector((state) => state.currentSong[beatType]);
  const instrumentName = useSelector(
    (state) => state.currentSong.melodyInstrument
  );
  const synth = useSelector((state) => state.sounds.synth);
  const piano = useSelector((state) => state.sounds.piano);
  const melodyMode = useSelector((state) => state.currentSong.melodyMode);
  const melodyKey = useSelector((state) => state.currentSong.melodyKey);

  const instrument = instrumentName === 'synth' ? synth : piano;

  const changeHandler = (n, checked, isCurrentBeat) => {
    const payload = {};
    payload[beatType] = { ...rowBeats };
    if (checked) {
      delete payload[beatType][n];
      if (isCurrentBeat) {
        instrument.triggerRelease(modes[melodyMode](melodyKey)[scaleIndex], 0);
      }
    } else payload[beatType][n] = { duration: 1 };
    dispatch(changeSongAttribute(payload));
  };

  const resizeHandler = (n, duration) => {
    const payload = {};
    payload[beatType] = { ...rowBeats };
    payload[beatType][n] = { ...payload[beatType][n], duration };
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
