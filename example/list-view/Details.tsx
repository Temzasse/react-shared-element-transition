import * as React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Item } from '../utils/data';
import { useSharedElementTransition } from '../../src/index';
import ImagePreview from './ImagePreview';

const Details = ({ item }: { item: Item }) => {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const props = useSharedElementTransition(item.id);

  return (
    <>
      <Wrapper>
        <Header>
          <BackButton to={'../'}>BACK</BackButton>
        </Header>

        <Image
          {...props}
          src={item.image}
          onClick={() => setPreviewVisible(true)}
        />

        <Title>{item.title}</Title>

        <Description>{item.text}</Description>
      </Wrapper>

      {previewVisible && (
        <ImagePreview item={item} onClose={() => setPreviewVisible(false)} />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
`;

const Header = styled.div`
  margin-bottom: 16px;
`;

const BackButton = styled(Link)`
  border-radius: 999px;
  padding: 4px 12px;
  background-color: slategray;
  display: inline-block;
  border: none;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 32px;
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
