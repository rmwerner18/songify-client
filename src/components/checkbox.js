import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute'
import { isOnMeasureLine } from '../helper_functions.js/is_on_measure_line'
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat'

const Checkbox = props => {

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
  const currentBeat = useSelector(state => state.currentBeat)

  const { beatType, n, index } = props

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

  // console.log(currentBeat === n)

  const changeHandler = (e) => {
    const { name: beatType, id } = e.target
    const newArray = addOrRemoveBeat(beatTypes[beatType], id)
    const payload = {}
    payload[beatType] = newArray
    dispatch(changeSongAttribute(payload))
  }

  return (
    <div key={index} className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
    <label className='checkbox-container'>
      <input type="checkbox" className={currentBeat === n ? 'checkbox playing' : 'checkbox'} checked={beatTypes[beatType].includes(n)} name={beatType} id={n} onChange={(e) => changeHandler(e, beatTypes[beatType])}/>
      <div className='checkmark'></div>
    </label>
    </div>
  )
}

export default Checkbox