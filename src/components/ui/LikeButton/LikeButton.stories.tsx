import type { StoryObj } from '@storybook/react-vite';

import { ColorVariants } from '../types.js';
import LikeButton from './LikeButton.js';

export default {
  title: 'Buttons/LikeButton',
  component: LikeButton,

  argTypes: {
    color: {
      options: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
      control: {
        type: 'radio',
        labels: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
      },
    },
    handleLike: {
      action: 'like',
    },
    handleUnlike: {
      action: 'unlike',
    },
  },
};

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {};
