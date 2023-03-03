import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';
import { setSongDropdown } from '../actions/set_song_dropdown';

const SongDropdownMenu = ({ style }) => {
  const [playlistsDropdown, setPlaylistsDropdown] = useState(false);
  const songDropdown = useSelector((state) => state.songDropdown);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddSong = async (id) => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: id, song_id: songDropdown.songId }),
    };

    const res = await fetch(BASE_API_URL + 'playlist_songs', fetchConfig);
    const playlist = await res.json();
  };

  const showPlaylists = () => {
    return user.playlists.map((playlist) => {
      return (
        <div
          className='dropdown-option'
          onClick={() => handleAddSong(playlist.id)}
          style={{ height: '20px' }}
        >
          {playlist.name}
        </div>
      );
    });
  };

  return (
    <div
      className='dropdown-content'
      onMouseLeave={() => dispatch(setSongDropdown({}))}
      style={style}
    >
      <div className='dropdown-content-first'>
        <button className='dropdown-option'>Link 1</button>
        <button
          className='dropdown-option'
          onMouseOver={() => setPlaylistsDropdown(true)}
          // onMouseLeave={() => setPlaylistsDropdown(false)}
        >
          {playlistsDropdown && (
            <div
              className={'dropdown-content-second'}
              style={{ top: -(songDropdown.y / 1.5) }}
            >
              {showPlaylists()}
            </div>
          )}
          Add to Playlist
          <FontAwesomeIcon
            icon={solid('caret-right')}
            className='font-awesome'
          />
        </button>
        <button className='dropdown-option'>Link 3</button>
      </div>
    </div>
  );
};

export default SongDropdownMenu;
