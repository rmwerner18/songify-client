import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSongAttribute } from '../actions/current_song';

const InstrumentForm = ({ instrumentType }) => {
  const instrument = useSelector((state) => state.currentSong[instrumentType]);
  const dispatch = useDispatch();

  return (
    <select
      className='instrument-form'
      defaultValue={instrument}
      onChange={(e) =>
        dispatch(changeSongAttribute({ [instrumentType]: e.target.value }))
      }
    >
      <option value='piano'>Piano</option>
      <option value='synth'>Synth</option>
    </select>
  );
};

export default InstrumentForm;
