import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';
import { Menu, Notification } from '@mantine/core';

const SongDropdownMenu = ({ id }) => {
  const user = useSelector((state) => state.user);

  const handleAddSong = async (playlistId) => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: playlistId, song_id: id }),
    };

    const res = await fetch(BASE_API_URL + 'playlist_songs', fetchConfig);
    const playlist = await res.json();
    if (playlist) {
      console.log('abcdefghijklmnop');
    }
  };

  const showPlaylists = () =>
    user.playlists.map((playlist) => (
      <Menu.Item onClick={() => handleAddSong(playlist.id)}>
        {playlist.name}
      </Menu.Item>
    ));

  return (
    <>
      <Menu.Dropdown>
        <Menu.Item>Link 1</Menu.Item>
        <Menu.Item>
          <Menu trigger='hover' position='left' keepMounted>
            <Menu.Target>
              <div>Add to Playlist</div>
            </Menu.Target>
            <Menu.Dropdown>{showPlaylists()}</Menu.Dropdown>
          </Menu>
        </Menu.Item>
        <Menu.Item>Link 3</Menu.Item>
      </Menu.Dropdown>
    </>
  );
};

export default SongDropdownMenu;
