import * as React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { galleryItems } from '../utils/data';
import ImageGrid from './ImageGrid';
import ImagePreview from './ImagePreview';

const ImageGallery = () => {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<ImageGrid items={galleryItems} />}>
          <Route path=":id" element={<ImagePreview items={galleryItems} />} />
        </Route>
      </Routes>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default ImageGallery;
