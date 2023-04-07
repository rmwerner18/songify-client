import { Slider } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../components/loading_page';
import Grid from './grid';
// import LeftGridOptionsContainer from './left_grid_options_container';
// import RightGridOptionsContainer from './right_grid_options_container';

const GridPage = (props) => {
  const sounds = useSelector((state) => state.sounds);
  return sounds.loaded ? (
    <div className='grid-page'>
      <Grid song_id={props.song_id ? props.song_id : null} />
    </div>
  ) : (
    <LoadingPage />
  );
};

export default GridPage;
