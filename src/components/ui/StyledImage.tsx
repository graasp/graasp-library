import { DetailedHTMLProps, ImgHTMLAttributes, type JSX } from 'react';

import { SxProps, styled } from '@mui/material';

type ImageProps = {
  sx?: SxProps;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const StyledImage = (props: ImageProps): JSX.Element => {
  const LocalStyledImage = styled('img')({});
  return <LocalStyledImage {...props} />;
};
