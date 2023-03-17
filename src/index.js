import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, useDispatch } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { currentSongReducer } from './reducers/current_song_reducer';
import { soundsReducer } from './reducers/sounds_reducer';
import { userReducer } from './reducers/user_reducer';
import { allSongsReducer } from './reducers/all_songs_reducer';
import { nowPlayingReducer } from './reducers/now_playing_reducer';
import { currentBeatReducer } from './reducers/current_beat_reducer';
import { playlistsReducer } from './reducers/playlists_reducer';
import { chordClipboardReducer } from './reducers/chord_clipboard_reducer';
import { SongDropdownReducer } from './reducers/song_dropdown_reducer';
import { MantineProvider } from '@mantine/core';
import theme from './styles/mantine-theme';

const reducer = combineReducers({
  currentSong: currentSongReducer,
  allSongs: allSongsReducer,
  sounds: soundsReducer,
  user: userReducer,
  nowPlaying: nowPlayingReducer,
  currentBeat: currentBeatReducer,
  allPlaylists: playlistsReducer,
  chordClipboard: chordClipboardReducer,
  songDropdown: SongDropdownReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
