import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { album } from '../utils/data';
import Device from '../utils/Device';
import Album from './Album';
import Player from './Player';

const IOSMusicPlayer = () => {
  return (
    <Device>
      <Routes>
        <Route path="/" element={<Album album={album} />}>
          <Route path=":song" element={<Player album={album} />} />
        </Route>
      </Routes>
    </Device>
  );
};

export default IOSMusicPlayer;
