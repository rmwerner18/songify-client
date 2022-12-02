import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeSongAttribute } from '../actions/change_song_attribute'

const Checkbox = props => {

 const iBeats = useSelector(state => state.currentSong.iBeats)
 const iiBeats = useSelector(state => state.currentSong.iiBeats)
 const iiiBeats = useSelector(state => state.currentSong.iiiBeats)
 const ivBeats = useSelector(state => state.currentSong.ivBeats)
 const vBeats = useSelector(state => state.currentSong.vBeats)
 const viBeats = useSelector(state => state.currentSong.viBeats)
 const viiBeats = useSelector(state => state.currentSong.viiBeats)
 const IBeats = useSelector(state => state.currentSong.IBeats)

 const beatTypes = {
  'iBeats': iBeats,
  'iiBeats': iiBeats,
  'iiiBeats': iiiBeats,
  'ivBeats': ivBeats,
  'vBeats': vBeats,
  'viBeats': viBeats,
  'viiBeats': viiBeats,
  'IBeats': IBeats,
 }

 const dispatch = useDispatch()

const changeHandler = (e) => {
  const { name: beatType, id } = e.target
  const newArray = addOrRemoveBeat(beatTypes[beatType], id)
  dispatch(changeSongAttribute({beatType: newArray}))
}

 return (
  <div key={index} className={`checkbox-meta-container ${isOnMeasureLine(index) ? 'measure-line' : null}`}>
   <label className='checkbox-container'>
    <input type="checkbox" checked={props.beats.includes(n)} name="iiiBeats" id={n} onChange={(e) => changeHandler(e, iiiBeats)}/>
    <div className='checkmark'></div>
   </label>
  </div>
 )
}

export default Checkbox