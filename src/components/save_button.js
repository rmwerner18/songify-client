import React, { useState } from 'react';
import { stopLoop } from '../helper_functions/stop_loop';
import { endNowPlaying } from '../actions/now_playing';
import SongNameForm from '../components/song_name_form';
import { handleNewNotification } from '../actions/notifications';
import { fetchHeaders } from '../constants/fetch_headers';
import { connect, useDispatch } from 'react-redux';
import BASE_API_URL from '../constants/base_api_url';
import { omit } from 'lodash';

const SaveButton = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const saveEdit = async (newObj) => {
    const fetchConfig = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newObj),
    };
    const response = await fetch(
      BASE_API_URL + `songs/${props.song_id}`,
      fetchConfig
    );
    const result = await response.json();
    stopLoop();
    props.endNowPlaying();
    if (result.message !== 'Please log in') {
      setModalIsOpen(false);
      dispatch(handleNewNotification('Song has been saved!'));
    } else alert(result.message);
  };

  const saveSong = (newObj) => {
    return fetch(BASE_API_URL + '/songs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newObj),
    })
      .then((resp) => resp.json())
      .then((song) => {
        if (song.id) {
          setModalIsOpen(false);
          dispatch(handleNewNotification('Song has been saved!'));
        }
      })
      .catch(() => {
        alert('could not save song');
      });
  };

  const makeChordArray = (chords) =>
    Object.keys(chords).map((startBeat) => omit(chords[startBeat], 'freqs'));

  const saveSongHandler = (e, songname) => {
    e.preventDefault();
    const newObj = { ...props.song };
    newObj.user_id = props.user.id;
    newObj.name = songname;
    newObj.chords = makeChordArray(props.song.chords);
    props.song_id ? saveEdit(newObj) : saveSong(newObj);
  };

  const openModalOrAlert = () => {
    props.user.id ? setModalIsOpen(true) : alert('Please login to save a song');
  };

  const modalClickHandler = () => {
    stopLoop();
    props.endNowPlaying();
    openModalOrAlert();
  };

  const modalCloseHandler = () => {
    setModalIsOpen(false);
  };

  const modal = () => {
    return (
      <div id={`song-name-form-modal`} className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={modalCloseHandler}>
            &times;
          </span>
          <div>{<SongNameForm submitHandler={saveSongHandler} />}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {modalIsOpen ? modal() : null}
      <div className='save-container'>
        <button
          className='save-button button'
          onClick={props.song_id ? saveSongHandler : modalClickHandler}
        >
          Save
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    song: state.currentSong,
    user: state.user,
  };
};

export default connect(mapStateToProps, { endNowPlaying })(SaveButton);
