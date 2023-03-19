import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';
import { Menu } from '@mantine/core';
import { removePlaylistSong } from '../actions/fetch_playlists';

const SongDropdownMenu = ({ songId, playlistId }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleAddSong = async (id) => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: id, song_id: songId }),
    };

    const res = await fetch(BASE_API_URL + 'playlist_songs', fetchConfig);
    const playlist = await res.json();
    if (playlist) {
      console.log(playlist);
    }
  };

  const handleRemoveSong = async () => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: playlistId, song_id: songId }),
    };
    const res = await fetch(BASE_API_URL + 'playlist_songs/remove_song', fetchConfig);
    console.log(res)
    if (res.status === 200) {
      dispatch(removePlaylistSong(playlistId, songId))
    }
  };

  const showPlaylists = () =>
    user.playlists.map((playlist) => (
      <Menu.Item onClick={() => handleAddSong(playlist.id)}>
        {playlist.name}
      </Menu.Item>
    ));

  return (
    <Menu.Dropdown>
      <Menu.Item>Link 1</Menu.Item>
      {playlistId && (
        <Menu.Item onClick={handleRemoveSong}>
          Remove From This Playlist
        </Menu.Item>
      )}
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
  );
};

export default SongDropdownMenu;
