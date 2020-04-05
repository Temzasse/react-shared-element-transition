import * as React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import {
  FaPlay,
  FaForward,
  FaBackward,
  FaVolumeOff,
  FaVolumeUp,
  FaListUl,
  FaPodcast,
  FaFire,
} from 'react-icons/fa';

import { useSharedElementTransition } from '../../src/index';
import { Album as AlbumType } from '../utils/data';
import { MoreButton } from './common';
import { fadeIn, slideUp } from '../utils/styled';

const Player = ({ song, album }: { song: string; album: AlbumType }) => {
  const props = useSharedElementTransition('album-image');

  return (
    <Wrapper>
      <Content>
        <Header>
          <span />
        </Header>

        <ImageWrapper to={'..'}>
          <Image {...props} src={album.image} />
        </ImageWrapper>

        <MainContent>
          <SongInfoWrapper>
            <SongInfo>
              <SongName>{song}</SongName>
              <ArtistName>{album.artist}</ArtistName>
            </SongInfo>
            <MoreButton />
          </SongInfoWrapper>

          <Track>
            <TrackTimeline />
            <TrackTimeInfo>
              <span>0.00</span>
              <span>-4.00</span>
            </TrackTimeInfo>
          </Track>

          <Controls>
            <Control>
              <FaBackward size={32} />
            </Control>
            <Control>
              <FaPlay size={32} />
            </Control>
            <Control>
              <FaForward size={32} />
            </Control>
          </Controls>

          <VolumeControl>
            <FaVolumeOff size={12} />
            <VolumeSlider type="range" />
            <FaVolumeUp size={12} />
          </VolumeControl>

          <IconButtons>
            <FaFire size={20} color="#333" />
            <FaPodcast size={20} color="#73ffd3" />
            <FaListUl size={20} color="#73ffd3" />
          </IconButtons>
        </MainContent>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  &:before {
    content: '';
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: -4px 0px 24px rgba(0, 0, 0, 0.5);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: #222;
    transform: translateY(100%);
    animation: ${slideUp} 400ms ease forwards;
  }
`;

const Content = styled.div`
  z-index: 1;
  position: relative;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${fadeIn} 400ms ease forwards;
  animation-delay: 400ms;

  & > span {
    display: inline-block;
    height: 4px;
    width: 32px;
    background-color: #444;
    border-radius: 999px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  animation: ${slideUp} 400ms ease forwards;
`;

const ImageWrapper = styled(Link)`
  text-decoration: none;
  padding: 48px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 8px;
  box-shadow: 0px 0px 1px rgba(255, 255, 255, 0.3);
  z-index: 999;
`;

const SongInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SongInfo = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
  line-height: 1.4;
`;

const SongName = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
`;

const ArtistName = styled.div`
  font-size: 18px;
  color: #73ffd3;
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0px;
`;

const TrackTimeline = styled.div`
  width: 100%;
  height: 3px;
  background-color: #333;
  margin-bottom: 4px;
  position: relative;
  border-radius: 1px;

  &:before {
    content: ' ';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: -2px;
    background-color: #666;
  }
`;

const TrackTimeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  font-size: 12px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;

const Control = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #fff;
  outline: none;

  &:active {
    background-color: #444;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  color: #666;
`;

const VolumeSlider = styled.input`
  appearance: none;
  width: 100%;
  height: 34px;
  flex: 1;
  margin: 0px 12px;
  padding: 32px 0px;
  background: none;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    background: #444;
    background-color: #333;
    border-radius: 1px;
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    margin-top: -9px;
  }
`;

const IconButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
`;

const PlayerContainer = ({ album }: { album: AlbumType }) => {
  const { song } = useParams();
  const _song = decodeURIComponent(song);
  const found = album.songs.find(s => s === _song);
  if (!found) return null;
  return <Player song={found} album={album} />;
};

export default PlayerContainer;
