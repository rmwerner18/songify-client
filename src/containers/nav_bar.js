import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentSong } from '../actions/set_current_song'
import { endNowPlaying } from '../actions/end_now_playing'
import { stopLoop } from '../helper_functions.js/stop_loop'
import DEFAULT_CHORDS from "../constants/default_chords"

const DEFAULT_SONG_STATE = {
 id: null,
 user_id: null,
 likes: 0,
 chords: DEFAULT_CHORDS,
 bpm: 100,
 snareBeats: [],
 kickBeats: [],
 hhBeats: [],
 instrument: "piano",
 iBeats: [],
 iiBeats: [],
 iiiBeats: [],
 ivBeats: [],
 vBeats: [],
 viBeats: [],
 viiBeats: [],
 IBeats: [],
 melodyKey: "C5",
 melodyMode: "ionian"
}

const link = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  padding: '0 20px',
  background: 'transparent',
  'fontFamily': 'Courier New',
  textDecoration: 'none',
  borderRadius: '10px',
  color: 'var(--spotify-text)',
  fontWeight: '900'
}

const createLink = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
  marginRight: '10px',
  height: '30px',
  padding: '0 20px',
  background: 'var(--spotify-green)',
  'fontFamily': 'Courier New',
  textDecoration: 'none',
  borderRadius: '10px',
  color: '#121212',
  fontWeight: '900'
}


const NavBar = (props) => {
  const dispatch = useDispatch()
  
  const resetAudio = () => {
    stopLoop()
    dispatch(endNowPlaying())
    dispatch(setCurrentSong(DEFAULT_SONG_STATE))
  }

  return ( 
    <div className='navbar'> 
      <NavLink
        to="/"
        exact
        style={createLink}
        onClick={resetAudio}
        activeStyle={{
          color: '#fff'
        }}
      >Create</NavLink>
      <NavLink
        to="/songs"
        exact
        style={link}
        onClick={resetAudio}
        activeStyle={{
          color: '#fff'
        }}
      >Listen</NavLink>
      {
        props.user.id 
        ?
        <NavLink
          to='/logout'
          exact
          style={link}
          activeStyle={{
            color: '#fff'
          }}
        >Logout</NavLink>
        :
        <NavLink
          to='/login'
          exact
          style={link}
          activeStyle={{
            color: '#fff'
          }}
        >Login</NavLink>
      }
    </div>
  )
}

export default NavBar