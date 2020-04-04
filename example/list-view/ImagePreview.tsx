import * as React from 'react';
import styled from 'styled-components';
import { Item } from '../utils/data';
import { useSharedElementTransition } from '../../src/index';

const ImagePreview = ({
  item,
  onClose,
}: {
  item: Item;
  onClose: () => void;
}) => {
  const props = useSharedElementTransition(item.id);

  return (
    <Wrapper onClick={onClose}>
      <Image {...props} src={item.image} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`
  width: auto;
  height: 90vh;
  z-index: 1;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.5);
`;

export default ImagePreview;
