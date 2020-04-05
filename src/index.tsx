import * as React from 'react';

interface TransitionOptions {
  duration: number;
  delay: number;
  easing: string;
  transformOrigin: string;
}

function getActiveSharedElements(id: string) {
  return Array.from(
    document.querySelectorAll(`[data-sheltr-id="${id}"]`)
  ) as HTMLElement[];
}

function rectsAreEqual(r1: DOMRect, r2: DOMRect) {
  return (
    r1.width === r2.width &&
    r1.height === r2.height &&
    r1.x === r2.x &&
    r1.y === r2.y
  );
}

const persisted: {
  [id: string]: {
    rect: DOMRect;
    borderRadius: string;
  };
} = {};

function transition({
  el,
  id,
  opts,
  dir,
}: {
  el: HTMLElement;
  id: string;
  opts: TransitionOptions;
  dir: 'in' | 'out';
}) {
  // There should ever be only two shared elements with a same id in the DOM
  // at the same time!
  const [otherEl] = getActiveSharedElements(id).filter(e => e !== el);
  const currentRect = el.getBoundingClientRect();
  const currentBorderRadius = getComputedStyle(el).borderRadius;

  if (dir === 'out') {
    if (!otherEl) {
      persisted[id] = {
        rect: currentRect,
        borderRadius: currentBorderRadius,
      };
      return;
    }

    if (otherEl) {
      const first = currentRect;
      const firstBorderRadius = currentBorderRadius;
      const last = otherEl.getBoundingClientRect();
      const lastBorderRadius = getComputedStyle(otherEl).borderRadius;

      // Show other element since we are animating back to it
      otherEl.style.visibility = 'visible';

      return invert({
        el: otherEl,
        rects: [first, last],
        borderRadii: [firstBorderRadius, lastBorderRadius],
        opts,
      });
    }
  }

  if (dir === 'in') {
    if (!otherEl && persisted[id]) {
      const first = persisted[id].rect;
      const firstBorderRadius = persisted[id].borderRadius;
      const last = currentRect;
      const lastBorderRadius = currentBorderRadius;

      if (rectsAreEqual(first, last)) return;

      delete persisted[id];

      return invert({
        el,
        rects: [first, last],
        borderRadii: [firstBorderRadius, lastBorderRadius],
        opts,
      });
    }

    if (otherEl) {
      const first = otherEl.getBoundingClientRect();
      const firstBorderRadius = getComputedStyle(otherEl).borderRadius;
      const last = currentRect;
      const lastBorderRadius = currentBorderRadius;

      // Hide other element while we animate current element
      otherEl.style.visibility = 'hidden';

      return invert({
        el,
        rects: [first, last],
        borderRadii: [firstBorderRadius, lastBorderRadius],
        opts,
      });
    }
  }
}

function invert({
  el,
  rects,
  borderRadii,
  opts,
}: {
  el: HTMLElement;
  rects: [DOMRect, DOMRect];
  borderRadii: [string, string];
  opts: TransitionOptions;
}) {
  const [first, last] = rects;
  const [firstBorderRadius, lastBorderRadius] = borderRadii;

  // Calculate scale and translate for inversion
  const scaleX = first.width / last.width;
  const scaleY = first.height / last.height;
  const translateX = first.x - last.x;
  const translateY = first.y - last.y;
  const translate = `translate3d(${translateX}px, ${translateY}px, 0px)`;
  const scale = `scale(${scaleX}, ${scaleY})`;
  const transform = `${translate} ${scale}`;
  const borderRadiusCorrection = 1 / ((scaleX + scaleY) / 2);

  // Invert
  requestAnimationFrame(() => {
    el.style.borderRadius = `calc(${firstBorderRadius} * ${borderRadiusCorrection})`;
    el.style.willChange = 'transform';
    el.style.transition = 'none';
    el.style.transformOrigin = opts.transformOrigin;
    el.style.transform = transform;

    // Set fixed width / height for more robust animation on Safari
    if (last.width > 0 && last.height > 0) {
      el.style.width = `${last.width}px`;
      el.style.height = `${last.height}px`;
    }

    play({ el, opts, borderRadius: lastBorderRadius });
  });
}

function play({
  el,
  borderRadius,
  opts,
}: {
  el: HTMLElement;
  borderRadius: string;
  opts: TransitionOptions;
}) {
  const { duration, easing, delay } = opts;

  requestAnimationFrame(() => {
    const config = `${duration}ms ${easing} ${delay}ms`;
    el.style.transition = `transform ${config}, border-radius ${config}`;
    el.style.transform = 'none';
    el.style.borderRadius = borderRadius;

    function onTransitionEnd() {
      // Remove tmp width and height
      el.style.removeProperty('width');
      el.style.removeProperty('height');

      // Cleanup transition related styles
      el.style.willChange = '';
      el.style.transition = '';
      el.style.transform = '';
      el.style.transformOrigin = '';
      el.style.borderRadius = '';
      el.style.visibility = '';

      el.removeEventListener('transitionend', onTransitionEnd);
    }

    // Remove temp properties after animation is finished
    el.addEventListener('transitionend', onTransitionEnd);
  });
}

const defaultOpts: TransitionOptions = {
  delay: 0,
  duration: 400,
  easing: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  transformOrigin: 'top left',
};

export function useSharedElementTransition(
  id: string,
  partialOpts: Partial<TransitionOptions> = {}
) {
  const ref = React.useRef<HTMLElement>(null);
  const opts = { ...defaultOpts, ...partialOpts };

  React.useLayoutEffect(() => {
    if (!ref.current) return;

    transition({ el: ref.current, opts, id, dir: 'in' });

    return () => {
      if (ref.current) {
        transition({ el: ref.current, opts, id, dir: 'out' });
      }
    };
  }, []);

  return { ref: ref as React.RefObject<any>, 'data-sheltr-id': id };
}
