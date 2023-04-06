import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { stopLoop } from '../helper_functions/stop_loop';
import { fetchSongs } from '../actions/all_songs';
import BASE_API_URL from '../constants/base_api_url';
import { fetchHeaders } from '../constants/fetch_headers';
import { Menu } from '@mantine/core';

const DeleteSongOption = ({ songId }) => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((state) => state.nowPlaying);

  const deleteSong = async (id) => {
    const fetchConfig = {
      method: 'DELETE',
      headers: fetchHeaders,
    };
    const res = await fetch(BASE_API_URL + 'songs/' + songId, fetchConfig);
    dispatch(fetchSongs());
  };

  const deleteHandler = (songId) => {
    if (nowPlaying.song && nowPlaying.song.id === songId) {
      stopLoop();
    }
    deleteSong();
  };

  return (
    <Menu.Item onClick={() => deleteHandler(songId)}>Delete Song</Menu.Item>
  );
};

export default DeleteSongOption;
