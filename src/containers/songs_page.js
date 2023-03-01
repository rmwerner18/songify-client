import React, { useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch } from 'react-redux';
import { fetchSongs } from '../actions/set_all_songs';
import VolumeForm from '../components/volume_form';
import { fetchPlaylists } from '../actions/fetch_playlists';
import SongsPageMenu from './songs_page_menu';

const SongsPage = ({ type, playlistId = false }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchPlaylists());
  }, []);

  return (
    <div className='songs-page'>
      <SongsPageMenu type={type} />
      <div className='songs-container-container'>
        {playlistId ? (
          <SongsContainer type={type} playlistId={playlistId}/>
        ) : (
          <SongsContainer type={type} />
        )}
      </div>
      <br />
      <div className='volume-form-container'>
        <VolumeForm />
      </div>
    </div>
  );
};

export default SongsPage;
