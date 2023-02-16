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

  const deleteSong = (song) => {
    return fetch(BASE_API_URL + `songs/${song.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      dispatch(fetchSongs());
    });
  };

  const deleteHandler = (song) => {
    if (nowPlaying.song && nowPlaying.song.id === song.id) {
      stopLoop();
    }
    deleteSong(song);
  };

  const userLikesSong = (song) => {
    return song.likes.find((like) => like.user_id === user.id);
  };

  const deleteLike = (like) => {
    return fetch(BASE_API_URL + `likes/${like.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((songs) => dispatch(setAllSongs(songs)));
  };

  const createLike = (song) => {
    return fetch(BASE_API_URL + '/likes/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        song_id: song.id,
        user_id: user.id,
      }),
    })
      .then((resp) => resp.json())
      .then((songs) => dispatch(setAllSongs(songs)));
  };

  const likeHandler = (e, id) => {
    const song = songs.find((song) => song.id === id);
    if (user.id) {
      if (userLikesSong(song)) {
        deleteLike(userLikesSong(song));
      } else {
        createLike(song);
      }
    }
  };

  return (
    <div className='songs-container'>
      {playlist && (
        <div>
          <div className='playlist-image-container'>
            <img />
          </div>
          <div className='playlist-name-container'>
            <PlaylistHeader playlist={playlist} />
          </div>
        </div>
      )}
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
      <div className={'songs-container-list'}>
        {renderSongsOrLoading()}
      </div>
    </div>
  );
};

export default SongsContainer;
