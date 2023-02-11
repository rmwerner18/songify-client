import React from 'react';
import { useSelector } from 'react-redux';
import { isOnMeasureLine } from '../helper_functions/is_on_measure_line';
import { createSelector } from '@reduxjs/toolkit';

const getIsCurrentBeat = createSelector(
  [(state) => state.currentBeat, (state, props) => props.beatIndex],
  (currentBeat, beatIndex) => beatIndex === currentBeat
);

const Checkbox = ({ n, checked, beatType, changeHandler }) => {
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatIndex: n })
  );

  return (
    <div
      key={n}
      style={{ left: n * 17 + 'px' }}
      className={`checkbox-meta-container ${isOnMeasureLine(n)}`}
    >
      <label className='checkbox-container'>
        <input
          type='checkbox'
          className={isCurrentBeat ? 'checkbox playing' : 'checkbox'}
          checked={checked}
          id={n}
          key={n}
          onChange={changeHandler}
        />
        <div className='checkmark'></div>
      </label>
    </div>
  );
};

export default Checkbox;
