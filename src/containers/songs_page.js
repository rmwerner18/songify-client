import React, { useEffect } from 'react';
import SongsContainer from './songs_container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../actions/set_all_songs';
import VolumeForm from '../components/volume_form';
import { fetchPlaylists } from '../actions/fetch_playlists';
import SongsPageMenu from './songs_page_menu';
import SongDropdownMenu from '../components/song_dropdown_menu';

const SongsPage = ({ type, playlistId = false }) => {
  const songDropdown = useSelector(state => state.songDropdown)
  const dispatch = useDispatch();

  const dropdownStyle = {
    left: songDropdown.x,
    top: songDropdown.y
  }

  useEffect(() => {
    dispatch(fetchSongs());
    dispatch(fetchPlaylists());
  }, []);

  return (
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
      {songDropdown.songId && <SongDropdownMenu style={dropdownStyle} />}
    </div>
  );
};

export default SongsPage;
