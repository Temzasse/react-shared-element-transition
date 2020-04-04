import * as React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { chunk, shuffle } from 'lodash';
import { useSharedElementTransition } from '../../src/index';
import { Item } from '../utils/data';
import { media } from '../utils/media';

const ImageGrid = ({ items }: { items: Item[] }) => {
  const columns = getImageColumns(items);

  return (
    <Wrapper>
      {columns.map(({ data, id }) => (
        <ImageGridColumn key={id}>
          {data.map(item => (
            <ImageGridItem key={item.id} item={item} />
          ))}
        </ImageGridColumn>
      ))}
      <Outlet />
    </Wrapper>
  );
};

const ImageGridItem = ({ item }: { item: Item }) => {
  const props = useSharedElementTransition(item.id);

  return (
    <ImageLink to={item.id}>
      <Image {...props} src={item.image} />
    </ImageLink>
  );
};

const getImageColumns = (items: Item[]) => {
  return chunk(items, Math.ceil(items.length / 3)).map((col, id) => ({
    data: shuffle(col),
    id,
  }));
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #000;
`;

const ImageGridColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.333332%;
  height: 100%;
  padding: 8px;
  padding-left: 0px;

  &:nth-of-type(1) {
    padding-left: 8px;
  }

  ${media.phone`
    width: 100%;
    padding-left: 8px;
    padding-bottom: 0px;
  `}
`;

const ImageLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  width: 100%;
  padding-bottom: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default ImageGrid;
