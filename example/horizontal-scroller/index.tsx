import * as React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { verticalItems } from '../utils/data';
import { media } from '../utils/media';
import List from './List';
import Details from './Details';

const HorizontalScroller = () => {
  return (
    <DeviceFrame>
      <DeviceContent>
        <Routes>
          <Route path="/" element={<List items={verticalItems} />} />
          <Route path=":id" element={<Details items={verticalItems} />} />
        </Routes>
      </DeviceContent>
    </DeviceFrame>
  );
};

/**
 * Good BGs
 * G5dMbH6ZEfI
 * 8tAasC7RWzw
 * a5uptAdUmjE
 * YBPIQ3JPdvo
 * 76YjW4gEAsI
 */

const DeviceFrame = styled.div`
  border: 8px solid #000;
  border-radius: 24px;
  margin: 16px;
  position: relative;

  &::after,
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    transform: translateX(-100%);
    background-color: #333;
    height: 48px;
    width: 4px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &::before {
    top: 15%;
  }

  &::after {
    top: calc(15% + 48px + 16px);
  }

  ${media.phone`
    border: none;
    border-radius: 0;
    margin: 0;
  `}
`;

const DeviceContent = styled.div`
  background-color: #090e1c;
  background-image: url('https://source.unsplash.com/KCEwOduK8ck');
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  height: calc(100vh - 32px);
  max-height: 736px;
  width: 414px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;

  ${media.phone`
    width: 100vw;
    height: 100vh;
    max-height: auto;
  `}
`;

export default HorizontalScroller;
