import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { galleryItems } from './utils/data';
import ListToDetails from './list-view';
import HorizontalScroller from './horizontal-scroller';
import ImageGallery from './image-gallery';

const App = () => {
  return (
    <>
      <Helmet>
        {/* Pre-load images for better animation experience on Safari */}
        {galleryItems.map(item => (
          <link key={item.id} rel="preload" as="image" href={item.image} />
        ))}
      </Helmet>

      <AppWrapper>
        <Routes>
          <Route path="/" element={<ExampleSelector />} />
          <Route path="list-view/*" element={<ListToDetails />} />
          <Route
            path="horizontal-scroller/*"
            element={<HorizontalScroller />}
          />
          <Route path="image-gallery/*" element={<ImageGallery />} />
        </Routes>
      </AppWrapper>
    </>
  );
};

const ExampleSelector = () => {
  return (
    <Wrapper>
      <Link to="list-view">List View</Link>
      <Link to="horizontal-scroller">Horizontal Scroller</Link>
      <Link to="image-gallery">Image Gallery</Link>
    </Wrapper>
  );
};

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

/**
 * IDEAS:
 * List thumbnail -> Details view header image
 * Item background -> Full screen background
 * Horizontal item scroller: image -> Full width header image
 * --> (https://gfycat.com/measlyinfamousfoxhound)
 * --> (https://dribbble.com/shots/6368172-Meditation-APP)
 * --> (https://gfycat.com/firsthandelectricgoosefish)
 * Image gallery -> Preview image (dismiss on scroll)
 * "Film Ticket Booking" (https://medium.muz.li/ui-interactions-of-the-week-120-c0b2e5199df0)
 * Profile image circle from sidebar -> Profile page middle of page
 * https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/
 */
