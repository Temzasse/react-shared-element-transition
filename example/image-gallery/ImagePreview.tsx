import * as React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSharedElementTransition } from '../../src/index';
import { media } from '../utils/media';
import { Item } from '../utils/data';

const ImagePreview = ({ item }: { item: Item }) => {
  const navigate = useNavigate();
  const props = useSharedElementTransition(item.id);

  return (
    <Wrapper onClick={() => navigate('..')}>
      <Image {...props} src={item.image} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-height: 90vh;
  max-width: 90vh;
  border-radius: 8px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.7);
  background-color: #eee;

  ${media.phone`
    width: calc(100% - 16px);
  `}
`;

const ImagePreviewContainer = ({ items }: { items: Item[] }) => {
  const { id } = useParams();
  const item = items.find(i => i.id === id);
  if (!item) return null;
  return <ImagePreview item={item} />;
};

export default ImagePreviewContainer;
