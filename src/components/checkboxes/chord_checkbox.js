import React, { useState } from 'react';
import { MID_NOTES, BASS_NOTES } from '../../constants/notes';
import { CHORD_QUALITIES } from '../../constants/chord_qualities';
import { useSelector, useDispatch } from 'react-redux';
import { isOnMeasureLine } from '../../helper_functions/is_on_measure_line';
import { createSelector } from '@reduxjs/toolkit';
import { Rnd } from 'react-rnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { setChordClipboard } from '../../actions/set_chord_clipboard';

const getIsCurrentBeat = createSelector(
  [(state) => state.currentBeat, (state, props) => props.beatRange],
  (currentBeat, beatRange) =>
    currentBeat >= beatRange[0] && currentBeat < beatRange[1]
);

const ChordCheckbox = ({
  beat,
  checked,
  changeHandler,
  beatObject,
  resizeHandler,
}) => {
  const duration = beatObject ? beatObject.duration : 0;
  const isCurrentBeat = useSelector((state) =>
    getIsCurrentBeat(state, { beatRange: [beat, beat + duration] })
  );
  const clipboardName = useSelector((state) => state.chordClipboard.name);
  const clipboardBass = useSelector((state) => state.chordClipboard.bass);
  const clipboardQuality = useSelector((state) => state.chordClipboard.quality);
  const dispatch = useDispatch();

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [mouseDownDuration, setMouseDownDuration] = useState(duration);

  const style = {
    display: 'flex',
    borderRadius: '3px',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px var(--dark-background)',
    zIndex: 1,
  };

  const checkboxResizeHandler = (ref) => {
    setMouseIsOver(true);
    resizeHandler(beat, ref.offsetWidth / 17);
  };

  return (
    <div
      className='chord-container'
      onMouseLeave={(e) => setMouseIsOver(false)}
    >
      <div
        key={beat}
        className={`checkbox-meta-container ${isOnMeasureLine(beat)}`}
        style={{ left: beat * 17 + 'px' }}
      >
        <label className='checkbox-container'>
          <input
            type='checkbox'
            className={isCurrentBeat ? 'checkbox playing' : 'checkbox'}
            checked={checked}
            id={beat}
            key={beat}
            onMouseDown={() => setMouseDownDuration(duration)}
            onChange={(e) => {
              if (mouseDownDuration === duration) {
                changeHandler(
                  beat,
                  checked,
                  {
                    name: clipboardName,
                    bass: clipboardBass,
                    quality: clipboardQuality,
                  },
                  isCurrentBeat
                );
              }
            }}
          />
          {checked ? (
            <Rnd
              className='checkmark'
              style={style}
              default={{
                x: 0,
                y: 0,
                width: beatObject ? beatObject.duration * 17 : 17,
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
            <div className='checkmark' style={{ width: 17 + 'px' }}></div>
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
              left: beat * 17 + 'px',
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
            {MID_NOTES[beatObject.name]}
            {CHORD_QUALITIES[beatObject.quality]}/{BASS_NOTES[beatObject.bass]}{' '}
            <br />
            <FontAwesomeIcon
              icon={regular('clipboard')}
              className='font-awesome'
              onClick={() =>
                dispatch(
                  setChordClipboard({
                    name: beatObject.name,
                    bass: beatObject.bass,
                    quality: beatObject.quality,
                  })
                )
              }
              style={{ cursor: 'pointer' }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChordCheckbox;
