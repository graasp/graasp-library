import type { JSX } from 'react';

import { Box, Typography, styled, useTheme } from '@mui/material';

import { m } from '~/paraglide/messages';

type ItemTagProps = Readonly<{
  createdAt: string;
  updatedAt: string;
  isChild: boolean;
  showIsContentTag?: boolean;
}>;

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const RECENT_DAYS = 4;

const StyledItemTag = styled(Box, {
  shouldForwardProp: (props) => props !== 'tagColor',
})(({ tagColor }: { tagColor: string }) => ({
  position: 'absolute',
  m: 1,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',

  ' > p': {
    verticalAlign: 'center',
    borderRadius: 12,
    backgroundColor: tagColor,
    padding: '5px 12px',
    display: 'inline-block',
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 'normal',
  },
}));

export function ItemTag({
  isChild,
  createdAt,
  updatedAt,
  showIsContentTag = false,
}: ItemTagProps): JSX.Element | null {
  const theme = useTheme();
  if (showIsContentTag && isChild) {
    return (
      <StyledItemTag tagColor={theme.palette.primary.main}>
        <Typography variant="body2" fontSize={13}>
          {m.CONTENT_CHIP().toUpperCase()}
        </Typography>
      </StyledItemTag>
    );
  }

  const recentlyUpdated =
    Date.now() - new Date(updatedAt).getTime() < RECENT_DAYS * MS_PER_DAY;
  const recentlyCreated =
    Date.now() - new Date(createdAt).getTime() < RECENT_DAYS * MS_PER_DAY;

  const color = recentlyCreated ? '#84F05E' : '#F08D55';
  const text = recentlyCreated
    ? m.COLLECTION_CARD_TAG_NEW()
    : m.COLLECTION_CARD_TAG_UPDATED();

  if (recentlyCreated || recentlyUpdated) {
    return (
      <StyledItemTag tagColor={color}>
        <Typography variant="body2" fontSize={13}>
          {text.toUpperCase()}
        </Typography>
      </StyledItemTag>
    );
  }

  return null;
}
