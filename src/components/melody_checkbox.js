import React from 'react';
import { useSelector } from 'react-redux';
import { isOnMeasureLine } from '../helper_functions/is_on_measure_line';
import { createSelector } from '@reduxjs/toolkit';

const getIsCurrentBeat = createSelector(
  [(state) => state.currentBeat, (state, props) => props.beatIndex],
  (currentBeat, beatIndex) => beatIndex === currentBeat
);

const MelodyCheckbox = ({
  n,
  checked,
  changeHandler,
  beatObject,
  setBeatObject,
}) => {
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatIndex: n })
  );

  return (
    <div
      key={n}
      className={`checkbox-meta-container ${isOnMeasureLine(n)}`}
      style={{ left: n * 15 + 'px' }}
    >
      <label className='checkbox-container'>
        <input
          type='checkbox'
          className={isCurrentBeat ? 'checkbox playing' : 'checkbox'}
          checked={checked}
          id={n}
          key={n}
          onChange={(e) => changeHandler(e, checked)}
        />
        <div
          className={checked ? 'checkmark resizable-box' : 'checkmark'}
          style={checked ? null : { width: 15 + 'px' }}
        ></div>
      </label>
    </div>
  );
};

export default MelodyCheckbox;
