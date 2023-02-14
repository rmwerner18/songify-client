import React, { useState } from 'react';
import { MID_NOTES, BASS_NOTES } from '../../constants/notes';
import { CHORD_QUALITIES } from '../../constants/chord_qualities';
import { useSelector } from 'react-redux';
import { isOnMeasureLine } from '../../helper_functions/is_on_measure_line';
import { createSelector } from '@reduxjs/toolkit';
import { Rnd } from 'react-rnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const getIsCurrentBeat = createSelector(
  [(state) => state.currentBeat, (state, props) => props.beatIndex],
  (currentBeat, beatIndex) => beatIndex === currentBeat
);

const ChordCheckbox = ({ n, checked, changeHandler, beat, resizeHandler }) => {
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatIndex: n })
  );
  const [chordNameBassAndQuality, setChordNameBassAndQuality] = useState({
    name: 'C4',
    bass: 'C3',
    quality: 'majorSeventh',
  });
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const { name, bass, quality } = chordNameBassAndQuality;

  const style = {
    display: 'flex',
    borderRadius: '3px',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px var(--dark-background)',
    background: 'var(--spotify-green)',
    zIndex: 2,
  };

  const checkboxResizeHandler = (ref) => {
    setMouseIsOver(true);
    resizeHandler(n, ref.offsetWidth / 17);
  };

  return (
    <div
      className='chord-container'
      onMouseLeave={(e) => setMouseIsOver(false)}
    >
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
            onChange={(e) => changeHandler(n, checked, chordNameBassAndQuality)}
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
              onResizeStop={(e, direction, ref, delta, position) =>
                checkboxResizeHandler(ref)
              }
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
              onMouseEnter={(e) => setMouseIsOver(true)}
            ></Rnd>
          ) : (
            <div
              className='checkmark'
              style={checked ? null : { width: 17 + 'px' }}
            ></div>
          )}
        </label>
      </div>
      {checked && mouseIsOver && (
        <>
          <div
            style={{
              height: '32px',
              width: '65px',
              border: '1px solid white',
              position: 'absolute',
              left: n * 17 + 'px',
              top: '21px',
              color: 'white',
              fontSize: '0.75rem',
              backgroundColor: 'var(--dark-background)',
              textAlign: 'center',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            <FontAwesomeIcon
              icon={solid('caret-up')}
              className='font-awesome'
              style={{
                position: 'absolute',
                top: '-8px',
                left: '3.5px',
                paddingRight: '60px',
              }}
            />
            {MID_NOTES[name]}
            {CHORD_QUALITIES[quality]}/{BASS_NOTES[bass]} <br />
            <span>copy</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ChordCheckbox;
