import React from 'react';
import CheckboxRow from '../containers/checkbox_row';

const BeatForm = () => {
  const beatTypes = ['hhBeats', 'snareBeats', 'kickBeats'];

  return (
    <div className='beat-form'>
      <div className='beat-container'>
        <div className='beat-labels'>
          <p>hi-hat</p>
          <p>snare</p>
          <p>kick</p>
        </div>
        <div>
          {beatTypes.map((beatType, n) => (
            <CheckboxRow key={n} beatType={beatType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeatForm;
