import React from 'react';
import Chord from '../components/chord';
import ChordCheckboxRow from './checkbox_rows/chord_checkbox_row';
import { useSelector } from 'react-redux';

const ChordsContainer = () => {
  const chords = useSelector((state) => state.currentSong.chords);

  const showChords = () => {
    return <ChordCheckboxRow beatType={'chords'} n={1} />;
    // chords.map((chord, index) => (
    //   <Chord
    //     id={index}
    //     key={index}
    //     bass={chord.bass}
    //     name={chord.name}
    //     quality={chord.quality}
    //   />
    // ));
  };

  return <div className='chord-container'>{showChords()}</div>;
};

export default ChordsContainer;
