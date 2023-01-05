import React from 'react'
import { clearMelody } from '../actions/clear_melody'
import { changeSongAttribute } from '../actions/change_song_attribute'
import { useDispatch, useSelector } from 'react-redux'

const MelodyOptions = () => {
 const dispatch = useDispatch()

 const melodyKey = useSelector(state => state.currentSong.melodyKey)
 const melodyMode = useSelector(state => state.currentSong.melodyMode)

 console.log(melodyKey)
 console.log(melodyMode)

 const keyRoots = [
  'C5',
  'C#5',
  'D5',
  'D#5',
  'E5',
  'F5',
  'F#5',
  'G5',
  'G#5',
  'A5',
  'A#5',
  'B5'
 ]

 const modes = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian"
 ]

 const removeNumber = (string) => {
  let newString = string.split('')
  newString.pop()
  return newString.join('')
 }
 const rootOptions = () => {
  return keyRoots.map(root => <option key={root} value={root} selected={removeNumber(melodyKey) === removeNumber(root) ? "selected" : null}>{removeNumber(root)}</option>)
 }
 const modeOptions = () => {
  return modes.map(mode => <option key={mode} selected={melodyMode === mode ? "selected" : null} value={mode}>{mode}</option>)
 } 
 
  return (
    <div className='mode-select'>
    <select onChange={e => dispatch(changeSongAttribute({melodyKey: e.target.value}))}>
      {rootOptions()}
    </select>
    <select onChange={e => dispatch(changeSongAttribute({melodyMode: e.target.value}))}>
      {modeOptions()}
    </select>
    <button className='button'onClick={() => dispatch(clearMelody())}>Clear Melody</button>
    </div>)
}

export default MelodyOptions



