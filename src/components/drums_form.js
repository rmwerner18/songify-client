import React from 'react';
import { useSelector } from 'react-redux';
import DrumCheckboxRow from '../containers/checkbox_rows/drum_checkbox_row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const DrumsForm = () => {
  const { hh, snare, kick } = useSelector((state) => state.sounds);
  const beatTypes = {
    hhBeats: {
      label: 'hihat',
      sound: hh,
    },
    snareBeats: {
      label: 'snare',
      sound: snare,
    },
    kickBeats: {
      label: 'kick',
      sound: kick,
    },
  };

  const makeDrumLabels = () => {
    return Object.keys(beatTypes).map((beatType) => {
      return (
        <p key={beatType}>
          {beatTypes[beatType]['label']}
          <FontAwesomeIcon
            icon={solid('volume-low')}
            className='font-awesome'
            onClick={() => beatTypes[beatType]['sound'].start()}
          />
        </p>
      );
    });
  };

  return (
    <div className='drum-form'>
      <div className='drum-container'>
        <div className='drum-labels'>{makeDrumLabels()}</div>
        <div>
          {Object.keys(beatTypes).map((beatType, n) => (
            <DrumCheckboxRow key={n} beatType={beatType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrumsForm;
