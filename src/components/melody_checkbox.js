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
  beatType,
  changeHandler,
  dragEnterHandler,
  dragStartHandler,
  dragEndHandler,
}) => {
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatIndex: n })
  );

  return (
    <div key={n} className={`checkbox-meta-container ${isOnMeasureLine(n)}`}>
      <label className='checkbox-container'>
        <input
          type='checkbox'
          className={isCurrentBeat ? 'checkbox playing' : 'checkbox'}
          checked={checked}
          id={n}
          key={n}
          onChange={changeHandler}
        />
        <div
          className='checkmark'
          onDragStart={() => dragStartHandler(n, beatType)}
          onDragEnter={() => dragEnterHandler(n, beatType)}
          onDragEnd={dragEndHandler}
        ></div>
      </label>
    </div>
  );
};

export default MelodyCheckbox;
