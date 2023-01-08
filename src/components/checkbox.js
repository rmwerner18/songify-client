import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'
import { createSelector } from '@reduxjs/toolkit'

const getIsCurrentBeat = createSelector(
  [
      state => state.currentBeat,
      (state, props) => props.beatIndex,
    ],
    (currentBeat, beatIndex) => beatIndex === currentBeat
  )
    
const Checkbox = ({ beatType, n })=> {

  const currentSong = useSelector(state => state.currentSong)
  const iBeats = currentSong.iBeats
  const iiBeats = currentSong.iiBeats
  const iiiBeats = currentSong.iiiBeats
  const ivBeats = currentSong.ivBeats
  const vBeats = currentSong.vBeats
  const viBeats = currentSong.viBeats
  const viiBeats = currentSong.viiBeats
  const IBeats = currentSong.IBeats
  const hhBeats = currentSong.hhBeats
  const snareBeats = currentSong.snareBeats
  const kickBeats = currentSong.kickBeats
  

  const isCurrentBeat = useSelector(state => getIsCurrentBeat(state, { beatIndex: n } )) 
  // const currentBeat = useSelector(state => state.currentBeat)

  // move beatType out of checkBox
  const beatTypes = {
    'iBeats': iBeats,
    'iiBeats': iiBeats,
    'iiiBeats': iiiBeats,
    'ivBeats': ivBeats,
    'vBeats': vBeats,
    'viBeats': viBeats,
    'viiBeats': viiBeats,
    'IBeats': IBeats,
    'hhBeats': hhBeats,
    'snareBeats': snareBeats,
    'kickBeats': kickBeats
  }

  const dispatch = useDispatch()

  const changeHandler = (e) => {
    const { name: beatType, id } = e.target
    const newArray = addOrRemoveBeat(beatTypes[beatType], id)
    const payload = {}
    payload[beatType] = newArray
    dispatch(changeSongAttribute(payload))
  }

  // console.log("CHECKBOX")
  return (
    <div key={n} className={`checkbox-meta-container ${isOnMeasureLine(n) ? 'measure-line' : null}`}>
    <label className='checkbox-container'>
      <input type="checkbox" className={isCurrentBeat ? 'checkbox playing' : 'checkbox'} 
      checked={beatTypes[beatType].includes(n)} name={beatType} id={n} onChange={(e) => changeHandler(e, beatTypes[beatType])}/>
      <div className='checkmark'></div>
    </label>
    </div>
  )
}

export default Checkbox