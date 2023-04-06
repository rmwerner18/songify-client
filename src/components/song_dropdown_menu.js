import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchHeaders } from '../constants/fetch_headers';
import BASE_API_URL from '../constants/base_api_url';
import { Menu } from '@mantine/core';
import { removePlaylistSong } from '../actions/playlists';
import DeleteSongOption from './delete_song_option';
import EditSongOption from './edit_song_option';
import { Notification } from '@mantine/core';
import { useHover } from '@mantine/hooks';

const SongDropdownMenu = ({ songId, songUserId, playlistId }) => {
  const user = useSelector((state) => state.user);
  const [notification, setNotification] = useState(false);
  const playlists = useSelector((state) => state.allPlaylists.playlists);
  const dispatch = useDispatch();

  const songBelongsToUser = () => user.id && songUserId === user.id;

  const handleAddSong = async (playlist) => {
    if (playlist.songs.find((song) => song.id === songId)) {
      console.log('song already in playlist');
    }
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: playlist.id, song_id: songId }),
    };

    const res = await fetch(BASE_API_URL + 'playlist_songs', fetchConfig);
    const json = await res.json();
    if (json) {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    }
  };

  const handleRemoveSong = async () => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist_id: playlistId, song_id: songId }),
    };
    const res = await fetch(
      BASE_API_URL + 'playlist_songs/remove_song',
      fetchConfig
    );
    console.log(res);
    if (res.status === 200) {
      dispatch(removePlaylistSong(playlistId, songId));
    }
  };

  const showPlaylists = () => [
    <Menu.Item onClick={() => console.log('check')}>
      Add To New Playlist
    </Menu.Item>,
    playlists.map((playlist) => (
      <Menu.Item onClick={() => handleAddSong(playlist)}>
        {playlist.name}
      </Menu.Item>
    )),
  ];

  return (
    <Menu.Dropdown>
      <Menu.Item>Link 1</Menu.Item>
      {songBelongsToUser() && (
        <>
          <DeleteSongOption songId={songId} />
          <EditSongOption songId={songId} />
        </>
      )}
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
