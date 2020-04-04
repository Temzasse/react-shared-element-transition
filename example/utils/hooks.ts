import * as React from 'react';
import { throttle } from 'lodash';

const getId = (idSuffix: string | number) => `scroll-restoration-${idSuffix}`;

export function restoreScroll(idSuffix: string | number) {
  const id = getId(idSuffix);
  const el = document.getElementById(id);
  handleScrollRestoration(el, id);
}

export function useScrollRestoration(idSuffix: string | number) {
  const id = getId(idSuffix);
  const ref = React.useRef<any>(null);

  const restoreScroll = React.useCallback(() => {
    const el = ref.current || document.getElementById(id);
    handleScrollRestoration(el, id);
  }, []);

  React.useEffect(() => {
    restoreScroll();

    // Setup scroll event listeners
    const throttled = throttle((scroll: { x: number; y: number }) => {
      sessionStorage.setItem(id, JSON.stringify(scroll));
    }, 32);

    const handleScroll = (event: any) => {
      throttled({
        x: event.currentTarget.scrollLeft,
        y: event.currentTarget.scrollTop,
      });
    };

    if (ref.current) ref.current.addEventListener('scroll', handleScroll);

    return () => {
      if (ref.current) ref.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [{ ref, id }, restoreScroll];
}

function handleScrollRestoration(el: any, id: string) {
  const persistedScroll = sessionStorage.getItem(id);

  if (!persistedScroll || !el) return;

  try {
    const { x, y } = JSON.parse(persistedScroll);
    const currentX = el.scrollLeft;
    const currentY = el.scrollTop;

    if (x !== currentX || y !== currentY) el.scrollTo(x, y);
  } catch (error) {
    sessionStorage.removeItem(id);
  }
}
