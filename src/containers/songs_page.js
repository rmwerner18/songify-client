import React, { useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../actions/all_songs';
import VolumeForm from '../components/volume_form';
import { fetchPlaylists } from '../actions/playlists';
import SongsPageMenu from './songs_page_menu';
import { Notification } from '@mantine/core';
import NotificationContainer from '../components/notification_container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


const SongsPage = ({ type, playlistIdParam }) => {
  const playlistId = playlistIdParam && parseInt(playlistIdParam);
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);
  const userId = user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  const showNotifications = () => {
    console.log(notifications);
    return notifications.map((notification) => (
      <Notification withCloseButton={false}>{notification}</Notification>
    ));
  };

  useEffect(() => {
    userId && dispatch(fetchPlaylists(userId));
  }, [userId]);

  return (
    <>
      <div className='songs-page'>
        <SongsPageMenu type={type} />
        <div className='songs-page-content'>
          <input className='search-bar-main' placeholder='Search'></input>
          <div className='songs-container-container'>
            {playlistId ? (
              <SongsContainer type={type} playlistId={playlistId} />
            ) : (
              <SongsContainer type={type} />
            )}
          </div>
        </div>
        <br />
        <div className='now-playing-options'>
          <FontAwesomeIcon icon={solid('backward')} className='font-awesome' />
          <FontAwesomeIcon icon={solid('play')} className='font-awesome' />
          <FontAwesomeIcon icon={solid('forward')} className='font-awesome' />
          <VolumeForm />
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

export default SongsPage;
