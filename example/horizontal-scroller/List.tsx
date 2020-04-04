import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Item } from '../utils/data';
import { useSharedElementTransition } from '../../src/index';
import { useScrollRestoration, restoreScroll } from '../utils/hooks';
import { hideScrollBar } from '../utils/styled';

const scrollerId = 'horizontal-scroller';

const List = ({ items }: { items: Item[] }) => {
  const sharedElProps = useSharedElementTransition('list-title', { delay: 200 });
  const [scrollerProps] = useScrollRestoration(scrollerId);

  return (
    <Wrapper>
      <ListTitle>
        <span {...sharedElProps}>Home</span>
      </ListTitle>
      <ListWrapper {...scrollerProps}>
        {items.map(item => (
          <ListItem item={item} key={item.id} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

const ListItem = ({ item }: { item: Item }) => {
  // Restore scroll position manually before the transition happens
  // in order to have correct measurements in the FLIP animation
  React.useLayoutEffect(() => {
    restoreScroll(scrollerId);
  }, []);

  const props = useSharedElementTransition(item.id);

  return (
    <ListItemWrapper {...props}>
      <ListLink to={item.id}>
        <ImageBackground src={item.image} />
        <ListItemContent>
          <ListItemTitle>{item.title}</ListItemTitle>
        </ListItemContent>
      </ListLink>
    </ListItemWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const ListTitle = styled.h2`
  margin: 0;
  padding: 16px;
  font-size: 42px;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    transparent 100%
  );

  & > span {
    display: inline-block;
  }
`;

const ListWrapper = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  & > li:not(:last-child) {
    margin-right: 24px;
  }

  /* Fix padding-right */
  &::after {
    content: '';
    flex: none;
    width: 16px;
    height: 1px;
  }

  ${hideScrollBar}
`;

const ListItemWrapper = styled.li`
  scroll-snap-align: center;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: none;
  height: 300px;
  width: 200px;
  border-radius: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

const ListLink = styled(Link)`
  text-decoration: none;
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
`;

const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 24px 16px;
  background: linear-gradient(
    to top,
    #000 0%,
    transparent 50%,
    transparent 100%
  );
`;

const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #eee;
`;

const ListItemTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export default List;
