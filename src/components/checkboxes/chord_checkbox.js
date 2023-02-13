import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isOnMeasureLine } from '../../helper_functions/is_on_measure_line';
import { createSelector } from '@reduxjs/toolkit';
import { Rnd } from 'react-rnd';

const getIsCurrentBeat = createSelector(
  [(state) => state.currentBeat, (state, props) => props.beatIndex],
  (currentBeat, beatIndex) => beatIndex === currentBeat
);

const ChordCheckbox = ({ n, checked, changeHandler, beat, resizeHandler }) => {
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatIndex: n })
  );

  const style = {
    display: 'flex',
    borderRadius: '3px',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px var(--dark-background)',
    background: 'var(--spotify-green)',
    zIndex: 2,
  };

  return (
    <div
      key={n}
      className={`checkbox-meta-container ${isOnMeasureLine(n)}`}
      style={{ left: n * 17 + 'px' }}
    >
      <label className='checkbox-container'>
        <input
          type='checkbox'
          className={isCurrentBeat ? 'checkbox playing' : 'checkbox'}
          checked={checked}
          id={n}
          key={n}
          onChange={(e) => changeHandler(n, checked)}
        />
        {checked ? (
          <Rnd
            style={style}
            default={{
              x: 0,
              y: 0,
              width: beat ? beat.duration * 17 : 17,
              height: 17,
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              resizeHandler(n, ref.offsetWidth / 17);
            }}
            resizeGrid={[17, 17]}
            disableDragging={true}
            enableResizing={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            bounds={'.checkbox-row'}
          ></Rnd>
        ) : (
          <div
            className='checkmark'
            style={checked ? null : { width: 17 + 'px' }}
          ></div>
        )}
      </label>
    </div>
  );
};

export default ChordCheckbox;