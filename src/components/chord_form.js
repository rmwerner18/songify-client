import React, { useState } from 'react';
import { MID_NOTES, BASS_NOTES } from '../constants/notes';
import { CHORD_QUALITIES } from '../constants/chord_qualities';
import { useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { setChordClipboard } from '../actions/set_chord_clipboard';

const ChordForm = () => {
  const chord = useSelector((state) => state.chordClipboard);
  const [bass, setBass] = useState(chord.bass);
  const [name, setName] = useState(chord.name);
  const [quality, setQuality] = useState(chord.quality);
  const dispatch = useDispatch()

  const chordNameOptions = () => {
    return Object.keys(MID_NOTES).map((noteValue) => {
      return (
        <option
          value={noteValue}
          selected={chord.name === noteValue ? true : false}
        >
          {MID_NOTES[noteValue]}
        </option>
      );
    });
  };

  const chordQualityOptions = () => {
    return Object.keys(CHORD_QUALITIES).map((qual) => {
      return (
        <option value={qual} selected={chord.quality === qual ? true : false}>
          {CHORD_QUALITIES[qual]}
        </option>
      );
    });
  };

  const chordBassOptions = () => {
    return Object.keys(BASS_NOTES).map((noteValue) => {
      return (
        <option
          value={noteValue}
          selected={chord.bass === noteValue ? true : false}
        >
          {BASS_NOTES[noteValue]}
        </option>
      );
    });
  };

  return (
    <div className='chord-box'>
      <div className='chord-edit-selects'>
        <select
          className='chord-name-select'
          onChange={(e) => setName(e.target.value)}
        >
          {chordNameOptions()}
        </select>
        <select
          className='chord-quality-select'
          onChange={(e) => setQuality(e.target.value)}
        >
          {chordQualityOptions()}
        </select>
        /
        <select
          className='chord-bass-select'
          onChange={(e) => setBass(e.target.value)}
        >
          {chordBassOptions()}
        </select>
        <FontAwesomeIcon
          icon={regular('clipboard')}
          className='font-awesome'
          onClick={e => {dispatch(setChordClipboard({bass, name, quality}))}}
        />
      </div>
    </div>
  );
};

export default ChordForm;
