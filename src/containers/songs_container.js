import React, { useState } from 'react';
import Song from '../components/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../components/search_bar';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import LoadingPage from '../components/loading_page';
import PlaylistHeader from '../components/playlist_header';
import { useSelector } from 'react-redux';

const SongsContainer = ({ type, playlistId = false }) => {
  const songsObject = useSelector((state) => state.allSongs);
  const user = useSelector((state) => state.user);
  const playlists = useSelector((state) => state.allPlaylists.playlists);
  const { songs, loaded, error } = songsObject;
  const [searchInput, setSearchInput] = useState('');

  const currentPlaylist =
    playlists?.find((playlist) => playlist.id === playlistId) ?? {};

  const currentPlaylistSongs = currentPlaylist && songs.filter((song) =>
    currentPlaylist.songs?.find((playlistSong) => playlistSong.id === song.id)
  );

  const filterSongs = () => {
    switch (type) {
      case 'user':
        return songs.filter((song) => song.user.id === user.id);
      case 'liked':
        return songs.filter((song) =>
          song.likes.find((like) => like.user_id === user.id)
        );
      case 'playlist':
        return currentPlaylistSongs;
      default:
        return songs;
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const renderSongsOrLoading = () => {
    return loaded ? renderSongsOrError() : <LoadingPage />;
  };

  const renderSongsOrError = () => {
    return error ? <h1>Unable to load songs</h1> : renderSongs();
  };

  const renderSongs = () => {
    const filteredSongs = filterSongs();
    return filteredSongs.length > 0 ? (
      applySearch(filteredSongs).map((song, index) => {
        return (
          <Song idx={index} key={song.id} song={song} playlistId={playlistId} />
        );
      })
    ) : (
      <h1>No Songs Yet</h1>
    );
  };

  const applySearch = (songs) => {
    if (searchInput) {
      return songs.filter((song) => {
        const formattedName = song.name.toLowerCase();
        const formattedUsername = song.user.username.toLowerCase();
        return (
          formattedName.includes(searchInput.toLowerCase()) ||
          formattedUsername.includes(searchInput.toLowerCase())
        );
      });
    }
    return songs;
  };

  return (
    <div className='songs-container'>
      {(currentPlaylist.length > 0) && <PlaylistHeader playlist={currentPlaylist} />}
      <div className='songs-container-header'>
        <span className='songs-container-header-col icon'>
          <FontAwesomeIcon icon={solid('hashtag')} className='font-awesome' />
        </span>
        <span className='songs-container-header-col song-title'>
          SONG TITLE
        </span>
        <span className='songs-container-header-col artist'>ARTIST</span>
        <span className='songs-container-header-col likes'>LIKES</span>
        <SearchBar
          className='songs-container-header-col search'
          searchInput={searchInput}
          handleSearch={handleSearch}
        />
      </div>
      <div className={'songs-container-list'}>{renderSongsOrLoading()}</div>
    </div>
  );
};

export default SongsContainer;
