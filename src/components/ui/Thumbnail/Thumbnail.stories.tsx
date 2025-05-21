import type { Meta, StoryObj } from '@storybook/react';

import Thumbnail from './Thumbnail.js';

const meta: Meta<typeof Thumbnail> = {
  title: 'Images/Thumbnail',
  component: Thumbnail,
};

export default meta;

type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {
  args: {
    maxWidth: 100,
    alt: 'myname',
    defaultComponent: <img alt="cover" src="https://picsum.photos/100" />,
  },
};

export const Loading: Story = {
  args: {
    maxWidth: 100,
    maxHeight: 100,
    isLoading: true,
  },
};

export const ItemThumbnail: Story = {
  args: {
    maxHeight: 100,
    maxWidth: 100,
    url: 'https://picsum.photos/100',
  },
};
