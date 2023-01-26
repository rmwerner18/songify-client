import React from 'react';
import CheckboxRow from '../containers/checkbox_row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import modes from '../constants/modes';

const MelodyForm = () => {
  const piano = useSelector((state) => state.sounds.piano);
  const melodyMode = useSelector((state) => state.currentSong.melodyMode);
  const melodyKey = useSelector((state) => state.currentSong.melodyKey);

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
            <CheckboxRow key={n} beatType={beatType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MelodyForm;
