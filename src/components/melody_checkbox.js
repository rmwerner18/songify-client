import React from 'react';
import { useSelector } from 'react-redux';
import { isOnMeasureLine } from '../helper_functions/is_on_measure_line';
import { createSelector } from '@reduxjs/toolkit';
import interact from 'interactjs';

const getIsCurrentBeat = createSelector(
  [(state) => state.currentBeat, (state, props) => props.beatIndex],
  (currentBeat, beatIndex) => beatIndex === currentBeat
);

const MelodyCheckbox = ({ n, checked, changeHandler }) => {
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatIndex: n })
  );

  interact('.resizable-box').resizable({
    edges: { right: true },

    listeners: {
      move(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute('data-x')) || 0;
        var y = parseFloat(target.getAttribute('data-y')) || 0;

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      // interact.modifiers.restrictEdges({
      //   outer: 'parent',
      // }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 15 },
      }),

      interact.modifiers.snapSize({
        targets: [interact.snappers.grid({ width: 15, height: 15 })],
      }),
    ],

    inertia: true,
  });

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
        ></div>
      </label>
    </div>
  );
};

export default MelodyCheckbox;
