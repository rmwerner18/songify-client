import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';

const SongDropdownMenu = ({ song }) => {
  const [playlistsDropdown, setPlaylistsDropdown] = useState(false);
  const playlists = useSelector((state) => state.allPlaylists.playlists);
  const user = useSelector((state) => state.user);

  const handleAddSong = async (id) => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: id, song_id: song.id }),
    };

    const res = await fetch(BASE_API_URL + 'playlist_songs', fetchConfig);
    const playlist = await res.json();
  };

  const showPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <div onClick={() => handleAddSong(playlist.id)}>{playlist.name}</div>
      );
    });
  };

  return (
    <div className='dropdown-content'>
      <div className='dropdown-content-first'>
        <button
          className='dropdown-option'
          onMouseOver={() => setPlaylistsDropdown(true)}
        >
          Add to Playlist
          <FontAwesomeIcon
            icon={solid('caret-right')}
            className='font-awesome'
          />
        </button>
        <button className='dropdown-option'>Link 2</button>
        <button className='dropdown-option'>Link 3</button>
      </div>
      <div className={'dropdown-content-second'}>
        {playlistsDropdown && showPlaylists()}
      </div>
    </div>
  );
};

export default SongDropdownMenu;
