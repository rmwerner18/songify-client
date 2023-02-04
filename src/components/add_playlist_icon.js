import React from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const AddPlaylistButton = () => {
  const user = useSelector((state) => state.user);

  const addPlaylist = () => {
    
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={solid('square-plus')}
        className='font-awesome'
        onClick={() => console.log('add playlist')}
      />
    </div>
  );
};

export default AddPlaylistButton;
