import React from 'react';
import { NavLink } from 'react-router-dom';
import { stopLoop } from '../helper_functions/stop_loop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { endNowPlaying } from '../actions/now_playing';
import { useDispatch, useSelector } from 'react-redux';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { fetchSongs } from '../actions/all_songs';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';

const DeleteAndEditButtons = ({ id }) => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((state) => state.nowPlaying);

  const editHandler = () => {
    stopLoop();
    dispatch(endNowPlaying());
  };

  const deleteSong = async (id) => {
    const fetchConfig = {
      method: 'DELETE',
      headers: fetchHeaders,
    };
    const res = await fetch(BASE_API_URL + 'songs/' + id, fetchConfig);
    dispatch(fetchSongs());
  };

  const deleteHandler = (song) => {
    if (nowPlaying.song && nowPlaying.song.id === song.id) {
      stopLoop();
    }
    deleteSong(song);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={solid('trash-can')}
        className='font-awesome'
        onClick={() => deleteHandler(id)}
      />
      <NavLink to={`/songs/${id}/edit`}>
        <FontAwesomeIcon
          icon={solid('pen-to-square')}
          className='font-awesome'
          onClick={editHandler}
        />
      </NavLink>
    </>
  );
};

export default DeleteAndEditButtons;
