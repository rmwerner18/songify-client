import React, { useState } from 'react';
import Song from '../components/song';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, setAllSongs } from '../actions/set_all_songs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../components/search_bar';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { stopLoop } from '../helper_functions/stop_loop';
import BASE_API_URL from '../constants/base_api_url';
import LoadingPage from '../components/loading_page';
import PlaylistHeader from '../components/playlist_header';
import { fetchHeaders } from '../constants/fetch_headers';

const SongsContainer = ({ songsObject, user, playlist = false }) => {
  const { songs, loaded, error } = songsObject;
  let [searchInput, setSearchInput] = useState('');
  const nowPlaying = useSelector((state) => state.nowPlaying);
  const dispatch = useDispatch();

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
    return songs.length > 0 ? (
      applySearch(songs).map((song, index) => {
        return (
          <Song
            idx={index}
            key={song.id}
            song={song}
            deleteHandler={deleteHandler}
            likeHandler={likeHandler}
          />
        );
      })
    ) : (
      <h1>No Songs Yet</h1>
    );
  };

  const applySearch = (songs) => {
    if (searchInput) {
      return songs.filter((song) => {
        let formattedName = song.name.toLowerCase();
        let formattedUsername = song.user.username.toLowerCase();
        return (
          formattedName.includes(searchInput.toLowerCase()) ||
          formattedUsername.includes(searchInput.toLowerCase())
        );
      });
    }
    return songs;
  };

  const deleteSong = async (id) => {
    const fetchConfig = {
      method: 'DELETE',
      headers: fetchHeaders,
    };
    const res = await fetch(BASE_API_URL + 'songs/' + id, fetchConfig);
    dispatch(fetchSongs());
  };

  const deleteHandler = (song) => {
    if (nowPlaying.song && nowPlaying.song.id === song.id) {
      stopLoop();
    }
    deleteSong(song);
  };

  const userLikesSong = (id) => {
    const song = songs.find((song) => song.id === id);
    return song.likes.find((like) => like.user_id === user.id);
  };

  const deleteLike = async (like) => {
    const fetchConfig = {
      method: 'DELETE',
      headers: fetchHeaders,
    };
    const res = await fetch(BASE_API_URL + 'likes/' + like.id, fetchConfig);
    const songs = await res.json();
    dispatch(setAllSongs(songs));
  };

  const createLike = async (id) => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        song_id: id,
        user_id: user.id,
      }),
    };
    const res = await fetch(BASE_API_URL + 'likes/', fetchConfig);
    const songs = await res.json();
    dispatch(setAllSongs(songs));
  };

  const likeHandler = (e, id) => {
    if (user.id) {
      if (userLikesSong(id)) {
        deleteLike(userLikesSong(id));
      } else {
        createLike(id);
      }
    }
  };

  return (
    <div className='songs-container'>
      {playlist && <PlaylistHeader playlist={playlist} />}
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
