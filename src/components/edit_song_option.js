import React from 'react';
import { useDispatch } from 'react-redux';
import { stopLoop } from '../helper_functions/stop_loop';
import { endNowPlaying } from '../actions/now_playing';
import { NavLink } from 'react-router-dom';
import { Menu } from '@mantine/core';

const EditSongOption = ({ songId }) => {
  const dispatch = useDispatch();

  const editHandler = () => {
    stopLoop();
    dispatch(endNowPlaying());
  };

  return (
    <NavLink to={`/songs/${songId}/edit`} style={{ textDecoration: 'none' }}>
      <Menu.Item onClick={editHandler}>Edit Song</Menu.Item>
    </NavLink>
  );
};

export default EditSongOption;
