import * as React from 'react';
import styled, { css } from 'styled-components';
import { Outlet, Link, useParams } from 'react-router-dom';
import { FaPlay, FaForward, FaRandom } from 'react-icons/fa';

import { useSharedElementTransition } from '../../src/index';
import { Album as AlbumType } from '../utils/data';
import { MoreButton } from './common';

const Album = ({ album }: { album: AlbumType }) => {
  const [currentSong, setCurrentSong] = React.useState<string>(album.songs[0]);
  const params = useParams();
  const playerVisible = !!decodeURIComponent(params['*']);
  const props = useSharedElementTransition('album-image');

  return (
    <>
      <Wrapper>
        <Content scaleDown={playerVisible}>
          <Header>
            <ImageWrapper>
              <Image src={album.image} />
            </ImageWrapper>

            <Details>
              <AlbumName>{album.name}</AlbumName>
              <AlbumArtist>{album.artist}</AlbumArtist>
              <AlbumInfo>
                {album.genre} &middot; {album.year}
              </AlbumInfo>
              <div style={{ flex: 1 }} />
              <MoreButton />
            </Details>
          </Header>

          <Controls>
            <ControlButton>
              <FaPlay size={12} />
              <span>Play</span>
            </ControlButton>

            <ControlButton>
              <FaRandom size={14} />
              <span>Shuffle</span>
            </ControlButton>
          </Controls>

          <SongList>
            {album.songs.map((song, index) => (
              <SongListItem key={song} onClick={() => setCurrentSong(song)}>
                <span>{index + 1}</span>
                <div>{song}</div>
              </SongListItem>
            ))}
          </SongList>
        </Content>

        <MiniPlayer to={currentSong}>
          <MiniImage {...props} src={album.image} />
          <MiniSongName>{currentSong}</MiniSongName>
          <FaPlay size={20} />
          <div style={{ width: 24 }} />
          <FaForward size={20} />
        </MiniPlayer>
      </Wrapper>

      <Outlet />
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Content = styled.div<{ scaleDown: boolean }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 16px;
  padding-bottom: 72px;
  background-color: #000;
  transition: all 200ms ease-in-out;

  ${props =>
    props.scaleDown &&
    css`
      transform: translateY(8px) scale(0.94);
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background-color: #111;
    `}
`;

const Header = styled.div`
  display: flex;
  padding-bottom: 16px;
`;

const ImageWrapper = styled.div`
  width: 160px;
  height: 160px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  line-height: 1.6;
`;

const AlbumName = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #fff;
`;

const AlbumArtist = styled.span`
  font-size: 14px;
  color: #73ffd3;
`;

const AlbumInfo = styled.span`
  font-size: 14px;
  color: #888;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 0px -16px;
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;

  & > button:first-of-type {
    margin-right: 16px;
  }
`;

const ControlButton = styled.button`
  flex: 1;
  border: none;
  background-color: #222;
  color: #73ffd3;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  outline: none;

  &:active {
    background-color: #333;
  }

  & > span {
    margin-left: 8px;
  }
`;

const SongList = styled.ul`
  padding: 0;
  margin: 0;
`;

const SongListItem = styled.div`
  list-style: none;
  margin-right: -16px;
  display: flex;
  align-items: center;
  font-size: 14px;

  & > span {
    display: inline-flex;
    color: #888;
    padding-left: 4px;
    padding-right: 8px;
  }

  & > div {
    color: #fff;
    flex: 1;
    border-bottom: 1px solid #222;
    padding: 16px;
    padding-left: 0px;
  }
`;

const MiniPlayer = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #222;
  box-shadow: -4px 0px 12px rgba(0, 0, 0, 0.5);

  &:active {
    background-color: #333;
  }
`;

const MiniImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
  margin-right: 16px;
`;

const MiniSongName = styled.span`
  display: inline-block;
  flex: 1;
  font-size: 14px;
`;

export default Album;
