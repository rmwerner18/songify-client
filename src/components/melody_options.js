import React from 'react'
import { clearMelody } from '../actions/clear_melody'
import { changeKey, changeMode } from '../actions/change_key_and_mode'
import { connect } from 'react-redux'

class MelodyOptions extends React.Component {
 keyRoots = [
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

 modes = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian"
 ]

 removeNumber = (string) => {
  let newString = string.split('')
  newString.pop()
  return newString.join('')
 }
 rootOptions = () => {
  return this.keyRoots.map(root => <option key={root} value={root} selected={this.removeNumber(this.props.melodyKey) === this.removeNumber(root) ? "selected" : null}>{this.removeNumber(root)}</option>)
 }
 modeOptions = () => {
  return this.modes.map(mode => <option key={mode} selected={this.props.melodyMode === mode ? "selected" : null} value={mode}>{mode}</option>)
 } 

 render() {
  return (
   <div className='mode-select'>
    <select onChange={e => this.props.changeKey(e.target.value)}>
     {this.rootOptions()}
    </select>
    <select onChange={e => this.props.changeMode(e.target.value)}>
     {this.modeOptions()}
    </select>
    <button className='button'onClick={this.props.clearMelody}>Clear Melody</button>
   </div>)
 }
}

const mapDispatchToProps = {
 changeKey,
 changeMode,
 clearMelody
}

const mapStateToProps = state => {
 return {
  melodyKey: state.currentSong.melodyKey,
  melodyMode: state.currentSong.melodyMode
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MelodyOptions)



