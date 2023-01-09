import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from "../components/checkbox";
import { numberOfBeatsArray } from "../helper_functions.js/make_beat_array";
import { addOrRemoveBeat } from '../helper_functions.js/add_or_remove_beat';
import { changeSongAttribute } from '../actions/change_song_attribute';

const CheckboxRow = ({ beatType }) => {
 const dispatch = useDispatch()
 const rowBeats = useSelector(state => state.currentSong[beatType])

 const changeHandler = (e) => {
  const { id } = e.target
  const newBeatArray = addOrRemoveBeat(rowBeats, id)
  const payload = {}
  payload[beatType] = [...newBeatArray]
  dispatch(changeSongAttribute(payload))
 }

 return <div className='checkbox-row'> 
  {numberOfBeatsArray.map(n => {return <Checkbox 
   key = {n}
   beatType={beatType} 
   n={n} 
   checked={rowBeats.includes(n)}
   changeHandler={changeHandler}
   />})}
 </div>
}

export default CheckboxRow