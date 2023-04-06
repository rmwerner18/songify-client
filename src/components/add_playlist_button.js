import React, { useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import BASE_API_URL from '../constants/base_api_url';
import { fetchHeaders } from '../constants/fetch_headers';
import { Redirect, withRouter } from 'react-router-dom';
import { setPlaylists } from '../actions/playlists';
import { fetchUser } from '../actions/user';

const AddPlaylistButton = ({ playlists }) => {
  const user = useSelector((state) => state.user);
  const [redirectPlaylist, setRedirectPlaylist] = useState({});
  const dispatch = useDispatch();

  const addPlaylist = async () => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({
        playlist: { name: 'New Playlist', user_id: user.id },
      }),
    };
    const res = await fetch(BASE_API_URL + 'playlists', fetchConfig);
    const playlist = await res.json();
    setRedirectPlaylist(playlist);
    dispatch(fetchUser());
  };

  return (
    <div>
      {redirectPlaylist.id ? (
        <>
          <Redirect exact to={`/songs/playlists/${redirectPlaylist.id}`} />
          <FontAwesomeIcon
            icon={solid('square-plus')}
            className='font-awesome'
            onClick={addPlaylist}
          />
        </>
      ) : (
        <FontAwesomeIcon
          icon={solid('square-plus')}
          className='font-awesome'
          onClick={addPlaylist}
        />
      )}
    </div>
  );
};

export default withRouter(AddPlaylistButton);
