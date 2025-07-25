import type { Meta, StoryObj } from '@storybook/react-vite';

import { PRIMARY_COLOR } from '../theme.js';
import GraaspLogo from './GraaspLogo.js';

const meta: Meta<typeof GraaspLogo> = {
  title: 'Icons/Graasp',
  component: GraaspLogo,

  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof GraaspLogo>;

export const Default: Story = {
  args: {
    height: 40,
  },
};

export const Primary: Story = {
  args: {
    height: 100,
    sx: { fill: PRIMARY_COLOR },
  },
};
