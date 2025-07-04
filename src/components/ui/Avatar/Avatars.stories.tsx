import type { JSX } from 'react';

import { Box, Stack } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { getColorFromId } from './stringToColor.js';

type Props = {
  cols: number;
  rows: number;
  size: number;
};

const ColorGrid = ({ cols, rows, size }: Props): JSX.Element => {
  const columnFactor = 256 / cols;
  const rowsFactor = 16 / rows;
  return (
    <Stack direction="row" gap="4px" flexWrap="wrap">
      {Array.from(Array(cols)).map((_, idx) => {
        const color = `${(idx * columnFactor).toString(16).padStart(2, '0')}`;
        return (
          <Stack key={color} direction="column" gap="4px">
            {Array.from(Array(rows)).map((_val, sat) => {
              const saturation = (sat * rowsFactor).toString(16);
              return (
                <Box
                  key={saturation}
                  bgcolor={getColorFromId(`${color}${saturation}`)}
                  height={size}
                  width={size}
                />
              );
            })}
          </Stack>
        );
      })}
    </Stack>
  );
};

const meta = {
  title: 'Images/AvatarGrid',
  component: ColorGrid,
  args: {
    cols: 64,
    rows: 16,
    size: 20,
  },
  argTypes: {
    cols: {
      options: [16, 32, 64],
      control: {
        type: 'radio',
      },
    },
    rows: {
      options: [1, 4, 8, 16],
      control: {
        type: 'radio',
      },
    },
    size: {
      options: [10, 20],
      control: {
        type: 'radio',
      },
    },
  },
} satisfies Meta<typeof ColorGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    cols: 16,
  },
} satisfies Story;
