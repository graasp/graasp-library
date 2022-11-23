import React, { FC } from 'react';

import { styled } from '@mui/material';

const SuccessfulLink = styled('a')(({ theme }) => ({
  display: 'block',
  fontStyle: 'italic',
  color: 'inherit',
  paddingTop: theme.spacing(1),
}));

type Props = {
  link: string;
  linkText: string;
  text: string;
};

const ToastrWithLink: FC<Props> = ({ link, text, linkText }) => (
  <div>
    {text}
    <SuccessfulLink target="_blank" rel="noreferrer" href={link}>
      {linkText}
    </SuccessfulLink>
  </div>
);

export default ToastrWithLink;
