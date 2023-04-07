import React, { useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../actions/all_songs';
import VolumeForm from '../components/volume_form';
import { fetchPlaylists } from '../actions/playlists';
import SongsPageMenu from './songs_page_menu';
import { Notification } from '@mantine/core';

const SongsPage = ({ type, playlistIdParam }) => {
  const playlistId = playlistIdParam && parseInt(playlistIdParam);
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  useEffect(() => {
    userId && dispatch(fetchPlaylists(userId));
  }, [userId]);

  return (
    <>
      <div className='songs-page'>
        <SongsPageMenu type={type} />
        <div className='songs-container-container'>
          {playlistId ? (
            <SongsContainer type={type} playlistId={playlistId} />
          ) : (
            <SongsContainer type={type} />
          )}
        </div>
        <br />
        <div className='volume-form-container'>
          <VolumeForm />
        </div>
      </div>
      <div className='toast-notification-container'>
        <Notification>Song has been added</Notification>
        <Notification>Song has been added</Notification>
        <Notification>Song has been added</Notification>
      </div>
    </>
  );
};

export default SongsPage;
