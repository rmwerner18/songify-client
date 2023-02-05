import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import BASE_API_URL from '../constants/base_api_url';
import { fetchHeaders } from '../constants/fetch_headers';

const AddPlaylistButton = () => {
  const user = useSelector((state) => state.user);

  const addPlaylist = async () => {
    const fetchConfig = {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify({ playlist: { name: 'New Playlist', user_id: user.id } }),
    };
    const res = await fetch(BASE_API_URL + 'playlists', fetchConfig);
    const playlist = await res.json()
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={solid('square-plus')}
        className='font-awesome'
        onClick={addPlaylist}
      />
    </div>
  );
};

export default AddPlaylistButton;
