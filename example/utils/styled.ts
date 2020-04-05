import { keyframes, css } from 'styled-components';

export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
`;

export const slideDownAndFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const slideRightAndFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    
  }
  to {
    opacity: 1;
    
  }
`;


export const hideScrollBar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 0 !important;
  }
`;