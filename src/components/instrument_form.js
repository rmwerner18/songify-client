import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSongAttribute } from '../actions/change_song_attribute';

const InstrumentForm = ({ instrumentType }) => {
  const instrument = useSelector((state) => state.currentSong[instrumentType]);
  const dispatch = useDispatch();

  return (
    <select
      className='instrument-form'
      onChange={(e) =>
        dispatch(changeSongAttribute({ [instrumentType]: e.target.value }))
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
