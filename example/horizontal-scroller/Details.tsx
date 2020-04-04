import * as React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Item } from '../utils/data';
import { useSharedElementTransition } from '../../src/index';
import { slideUp, slideRightAndFadeIn } from '../utils/styled';

const Details = ({ item }: { item: Item }) => {
  const sharedTitleProps = useSharedElementTransition('list-title');
  const sharedImageProps = useSharedElementTransition(item.id);

  return (
    <>
      <Wrapper>
        <BackgroundImage {...sharedImageProps} src={item.image} />

        <Header>
          <BackButton to={'../'}>
            <BackIcon />
            <span {...sharedTitleProps}>Home</span>
          </BackButton>
        </Header>

        <Content>
          <Title>{item.title}</Title>
          <Description>{item.text}</Description>
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px 48px 16px;
  background-color: #fff;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.2);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  transform: translateY(100%);
  animation: ${slideUp} 300ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  animation-delay: 200ms;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 16px;
  background-color: rgba(75, 75, 75, 0.4);
  backdrop-filter: blur(6px);
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;

  & > span {
    font-weight: 500;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  }
`;

const BackIcon = styled.i`
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
  margin-right: 8px;
  opacity: 0;
  animation: ${slideRightAndFadeIn} 200ms ease-in forwards;
  animation-delay: 300ms;

  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px;
  }
  &::after {
    width: 8px;
    height: 8px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    bottom: 7px;
  }
  &::before {
    width: 16px;
    height: 2px;
    bottom: 10px;
    background: currentColor;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #eee;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  font-size: 18px;
  margin: 0;
  line-height: 1.6;
`;

const DetailsContainer = ({ items }: { items: Item[] }) => {
  const { id } = useParams();
  const item = items.find(i => i.id === id);
  if (!item) return null;
  return <Details item={item} />;
};

export default DetailsContainer;
