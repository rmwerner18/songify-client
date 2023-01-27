import React, { useState } from 'react';
import MelodyCheckboxRow from '../containers/melody_checkbox_row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import modes from '../constants/modes';

const MelodyForm = () => {
  const piano = useSelector((state) => state.sounds.piano);
  const melodyMode = useSelector((state) => state.currentSong.melodyMode);
  const melodyKey = useSelector((state) => state.currentSong.melodyKey);
  const [beatObject, setBeatObject] = useState({
    beat: null,
    duration: 0,
    beatType: '',
  });

  console.log(beatObject);

  const beatTypes = {
    IBeats: {
      label: 'i',
      scaleIndex: 7,
    },
    viiBeats: {
      label: 'vii',
      scaleIndex: 6,
    },
    viBeats: {
      label: 'vi',
      scaleIndex: 5,
    },
    vBeats: {
      label: 'v',
      scaleIndex: 4,
    },
    ivBeats: {
      label: 'iv',
      scaleIndex: 3,
    },
    iiiBeats: {
      label: 'iii',
      scaleIndex: 2,
    },
    iiBeats: {
      label: 'ii',
      scaleIndex: 1,
    },
    iBeats: {
      label: 'i',
      scaleIndex: 0,
    },
  };

  const dragStartHandler = (n, beatType) => {
    setBeatObject({ ...beatObject, beat: n, beatType: beatType });
  };

  const dragEnterHandler = (n, checkboxBeatType) => {
    if (checkboxBeatType === beatObject.beatType) {
      setBeatObject({ ...beatObject, duration: n + 1 - beatObject.beat });
    }
  };

  const dragEndHandler = () => {
    console.log('DRAG END', beatObject);
  };

  const triggerSound = (scaleIndex) => {
    piano.triggerAttackRelease(modes[melodyMode](melodyKey)[scaleIndex], '8n');
  };

  const makeMelodyLabels = () => {
    return Object.keys(beatTypes).map((beatType) => {
      return (
        <p>
          {beatTypes[beatType]['label']}
          <FontAwesomeIcon
            icon={solid('volume-low')}
            className='font-awesome'
            onClick={() => triggerSound(beatTypes[beatType]['scaleIndex'])}
          />
        </p>
      );
    });
  };

  return (
    <div className='melody-form'>
      <div className='melody-container'>
        <div className='melody-labels'>{makeMelodyLabels()}</div>
        <div>
          {Object.keys(beatTypes).map((beatType, n) => (
            <MelodyCheckboxRow
              key={n}
              beatType={beatType}
              beatObject={beatObject}
              dragStartHandler={dragStartHandler}
              dragEnterHandler={dragEnterHandler}
              dragEndHandler={dragEndHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MelodyForm;
