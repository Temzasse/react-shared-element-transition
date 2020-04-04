import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { horizontalItems } from '../utils/data';
import List from './List';
import Details from './Details';

const ListToDetails = () => {
  return (
    <Routes>
      <Route path="/" element={<List items={horizontalItems} />} />
      <Route path=":id" element={<Details items={horizontalItems} />} />
    </Routes>
  );
};

export default ListToDetails;
