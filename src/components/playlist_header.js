import React from 'react'

const PlaylistHeader = ({ id }) => {
  return (
    <h1 onClick={() => console.log('adfv')}>Playlist Name {id}</h1>
  );
}

export default PlaylistHeader