import { Box, Stack } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar.js';
import { getColorFromId, stringToColor } from './stringToColor.js';

const meta = {
  title: 'Images/Avatar',
  args: {
    id: 'testId',
  },
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultAvatar = {
  args: {
    id: 'testId',
    alt: 'myname',
  },
} satisfies Story;

export const AvatarImage = {
  args: {
    alt: 'Avatar',
    maxHeight: 100,
    maxWidth: 100,
    url: 'https://picsum.photos/100',
  },
} satisfies Story;

export const Loading = {
  args: {
    alt: 'Loading Avatar',
    maxHeight: 100,
    maxWidth: 100,
  },
} satisfies Story;

export const ItemThumbnail = {
  args: {
    alt: 'Item thumbnail',
    maxHeight: 100,
    maxWidth: 100,
    url: 'https://picsum.photos/100',
  },
} satisfies Story;

export const ColoredAvatars = {
  args: {
    alt: 'user',
  },
  render: (props) => {
    return (
      <Stack direction="row" gap={2} flexWrap="wrap">
        {[
          'Evelynn',
          'Samuel',
          'Bob',
          'Natasha',
          'Samantha',
          'toto',
          '1234',
          'user 007',
          '1237892378147532',
          'west',
          'alice',
          'ed',
          'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
        ].map((name) => {
          return (
            <Avatar
              {...props}
              key={name}
              alt={name}
              sx={{ bgcolor: stringToColor(name) }}
            />
          );
        })}
      </Stack>
    );
  },
} satisfies Story;

const gradientIds = Array.from(Array(64)).map(
  (_, idx) => `${(idx * 4).toString(16).padStart(2, '0')}a`,
);
export const ColoredIdAvatars = {
  args: {
    alt: 'user',
  },
  render: (props) => {
    return (
      <Stack direction="row" gap={2} flexWrap="wrap">
        {gradientIds.map((id) => {
          return (
            <Avatar
              {...props}
              key={id}
              alt={id}
              maxWidth="10px"
              maxHeight="10px"
              sx={{ bgcolor: getColorFromId(id) }}
            />
          );
        })}
      </Stack>
    );
  },
} satisfies Story;

export const Colors = {
  args: {
    alt: 'user',
  },
  render: () => {
    return (
      <Stack direction="row" gap={1}>
        {Array.from(Array(64)).map((_, idx) => {
          const color = `${(idx * 4).toString(16).padStart(2, '0')}`;
          return (
            <Stack key={color} direction="column" gap={1}>
              {Array.from(Array(16)).map((val, sat) => (
                <Box
                  key={val}
                  bgcolor={getColorFromId(`${color}${sat.toString(16)}`)}
                  height={20}
                  width={20}
                />
              ))}
            </Stack>
          );
        })}
      </Stack>
    );
  },
} satisfies Story;
