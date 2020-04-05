import * as React from 'react';
import styled from 'styled-components';
import { media } from './media';

const Device: React.FC<{ bg?: string }> = ({ children, bg = '' }) => {
  return (
    <DeviceFrame>
      <DeviceContent bg={bg}>{children}</DeviceContent>
    </DeviceFrame>
  );
};

const DeviceFrame = styled.div`
  border: 8px solid #000;
  border-radius: 24px;
  margin: 16px;
  position: relative;

  &::after,
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    transform: translateX(-100%);
    background-color: #333;
    height: 48px;
    width: 4px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &::before {
    top: 15%;
  }

  &::after {
    top: calc(15% + 48px + 16px);
  }

  ${media.phone`
    border: none;
    border-radius: 0;
    margin: 0;
  `}
`;

const DeviceContent = styled.div<{ bg: string }>`
  background-color: #000;
  background-image: url('${props => props.bg}');
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  height: calc(100vh - 32px);
  max-height: 736px;
  width: 414px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  position: relative;

  ${media.phone`
    width: 100vw;
    height: 100vh;
    max-height: auto;
  `}
`;

export default Device;
