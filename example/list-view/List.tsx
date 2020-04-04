import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Item } from '../utils/data';
import { useSharedElementTransition } from '../../src/index';

const List = ({ items }: { items: Item[] }) => {
  return (
    <Wrapper>
      {items.map(item => (
        <ListLink to={item.id} key={item.id}>
          <ListItem item={item} />
        </ListLink>
      ))}
    </Wrapper>
  );
};

const ListItem = ({ item }: { item: Item }) => {
  const props = useSharedElementTransition(item.id);

  return (
    <Row>
      <Thumbnail {...props} src={item.image} />
      <Title>{item.title}</Title>
    </Row>
  );
};

const Wrapper = styled.ul`
  padding: 0;
`;

const ListLink = styled(Link)`
  text-decoration: none;
  color: #222;
`;

const Row = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
`;

const Thumbnail = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export default List;
