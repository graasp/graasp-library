import { type JSX, ReactNode, SVGProps } from 'react';

import { SxProps, styled } from '@mui/material';

type SVGWrapperProps = {
  children: ReactNode;
  viewBox?: string;
  size?: number;
  sx?: SxProps;
} & SVGProps<SVGElement>;

const SVGWrapper = ({
  children,
  viewBox,
  size,
  sx,
}: SVGWrapperProps): JSX.Element => {
  const StyledSVG = styled('svg')({
    width: size,
    height: size,
  });
  return (
    <StyledSVG viewBox={viewBox} sx={sx}>
      {children}
    </StyledSVG>
  );
};

type SVGPathProps = {
  sx?: SxProps;
} & SVGProps<SVGPathProps>;
const SVGPath = ({ d, sx }: SVGPathProps): JSX.Element => {
  const StyledPath = styled('path')();
  return <StyledPath d={d} sx={sx} />;
};

type StyledGProps = {
  /** if true, apply selected styles (default: false). Circles get primary color/opacity and paths get secondary color/opacity. */
  selected?: boolean;
  /** color of circle when selected. Color of path when not selected. */
  primaryColor?: string;
  /** opacity of circle when selected. Opacity of path when not selected. */
  primaryOpacity?: number;
  /** color of path when selected. Color of circle when not selected. */
  secondaryColor?: string;
  /** opacity of path when selected. Opacity of circle when not selected. */
  secondaryOpacity?: number;
  /** if true, apply disabled styles (default: false) */
  disabled?: boolean;
  /** if true, does not apply hover styles (default: false). On hover, circles get primary color/opacity and paths get secondary color/opacity. */
  disableHover?: boolean;
  /** color of path when disabled. */
  disabledColor?: string;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const StyledG: (props: StyledGProps & { children: ReactNode }) => ReactNode =
  styled('g')<StyledGProps>(({
    selected = false,
    primaryColor,
    primaryOpacity,
    secondaryColor,
    secondaryOpacity,
    disabled = false,
    disabledColor = '#CCC',
    disableHover = true,
  }) => {
    if (disabled) {
      return {
        path: {
          fill: disabledColor,
          fillOpacity: 0.6,
        },
        circle: {
          fill: 'transparent',
          fillOpacity: 1,
        },
      };
    }

    const hoverStyles = disableHover
      ? {}
      : {
          '&:hover': {
            circle: {
              fill: primaryColor,
              fillOpacity: primaryOpacity,
            },
            path: {
              fill: secondaryColor,
              fillOpacity: secondaryOpacity,
            },
          },
        };

    return {
      path: {
        fill: selected ? secondaryColor : primaryColor,
        fillOpacity: selected ? secondaryOpacity : primaryOpacity,
      },
      circle: {
        fill: selected ? primaryColor : 'transparent',
        fillOpacity: selected ? primaryOpacity : secondaryOpacity,
      },

      ...hoverStyles,
    };
  });

export { SVGWrapper, SVGPath, StyledG };
