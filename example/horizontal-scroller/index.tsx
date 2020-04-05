import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { verticalItems } from '../utils/data';
import Device from '../utils/Device';
import List from './List';
import Details from './Details';

const HorizontalScroller = () => {
  return (
    <Device bg={'https://source.unsplash.com/KCEwOduK8ck'}>
      <Routes>
        <Route path="/" element={<List items={verticalItems} />} />
        <Route path=":id" element={<Details items={verticalItems} />} />
      </Routes>
    </Device>
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

export default HorizontalScroller;
