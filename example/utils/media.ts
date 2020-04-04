import { css } from 'styled-components';

const BREAKPOINTS = {
  phone: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1279 },
  monitor: { min: 1280, max: Infinity },
};

type ExtraBreakpoints = 'tabletDown' | 'tabletUp' | 'desktopDown' | 'desktopUp';
type BreakpointKey = keyof typeof BREAKPOINTS | ExtraBreakpoints;
type CSSReturnType = ReturnType<typeof css>;
type MediaFn = (template: TemplateStringsArray) => CSSReturnType;
type Media = { [breakpoint in BreakpointKey]: MediaFn };

const em = (px: number) => `${px / 16}em`;

export const media = Object.entries(BREAKPOINTS).reduce(
  (acc, [breakpointKey, breakpointValue]) => {
    const key = breakpointKey as BreakpointKey;
    const { min, max } = breakpointValue;

    if (min === 0) {
      // Smallest breakpoint (phone)
      acc[key] = (template, ...args) => css`
        @media screen and (max-width: ${em(max)}) {
          ${css(template, ...args)}
        }
      `;
    } else if (max === Infinity) {
      // Largest breakpoint (monitor)
      acc[key] = (template, ...args) => css`
        @media screen and (min-width: ${em(min)}) {
          ${css(template, ...args)}
        }
      `;
    } else {
      // In-between breakpoint
      acc[key] = (template, ...args) => css`
        @media screen and (min-width: ${em(min)}) and (max-width: ${em(max)}) {
          ${css(template, ...args)}
        }
      `;

      const downKey = `${key}Down` as BreakpointKey;
      const upKey = `${key}Up` as BreakpointKey;

      acc[downKey] = (template, ...args) => css`
        @media screen and (max-width: ${em(max)}) {
          ${css(template, ...args)}
        }
      `;

      acc[upKey] = (template, ...args) => css`
        @media screen and (min-width: ${em(min)}) {
          ${css(template, ...args)}
        }
      `;
    }
    return acc;
  },
  {} as Media
);

/*
Usage example:

const Component = styled.div`
  color: black;

  ${media.phone`
    color: white;
  `}

  ${media.tablet`
    color: red;
  `}

  ${media.desktop`
    color: orange;
  `}

  ${media.monitor`
    color: blue;
  `}
`;
*/
