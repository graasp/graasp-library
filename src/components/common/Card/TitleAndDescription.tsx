import React from 'react';

import { Stack } from '@mui/material';

import Link from 'next/link';

import { CollapsibleText } from '../CollapsibleText/CollapsibleText';

const MAX_NUMBER_OF_LINES = 4;

type TitleAndDescriptionProps = Readonly<{
  name: string;
  description?: string | null;
  link: string;
}>;

function TitleAndDescription({
  name,
  description,
  link,
}: TitleAndDescriptionProps) {
  // merge name and description together
  // so we can count name and description in the same line count
  // it will take advantage of showing the full title if there's space from no description
  const text = `<h3>${name}</h3>${description ?? ''}`;

  return (
    <Stack
      sx={{
        '&:hover': {
          cursor: 'pointer',
          opacity: 0.7,
        },
      }}
    >
      <Link
        href={link}
        style={{
          textDecoration: 'unset',
          color: 'unset',
          cursor: 'pointer !important',
          height: '100%',
          display: 'block',
        }}
      >
        <CollapsibleText
          collapsed
          numberOfLinesToShow={MAX_NUMBER_OF_LINES}
          content={text}
          style={{ cursor: 'pointer' }}
        />
      </Link>
    </Stack>
  );
}

export default TitleAndDescription;
