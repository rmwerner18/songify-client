import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSongAttribute } from '../actions/change_song_attribute';

const InstrumentForm = () => {
  const instrument = useSelector((state) => state.currentSong.instrument);
  const dispatch = useDispatch();

  return (
    <select
      className='instrument-form'
      onChange={(e) =>
        dispatch(changeSongAttribute({ instrument: e.target.value }))
      }
    >
      <option selected={instrument === 'piano' ? true : false} value='piano'>
        Piano
      </option>
      <option selected={instrument === 'synth' ? true : false} value='synth'>
        Synth
      </option>
    </select>
  );
};

export default InstrumentForm;
