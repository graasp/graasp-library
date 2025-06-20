import type { StoryObj } from '@storybook/react-vite';

import LibraryIcon from './LibraryIcon.js';

export default {
  title: 'Icons/Library',
  component: LibraryIcon,
};

type Story = StoryObj<typeof LibraryIcon>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: { size: 24 },
};

export const Big: Story = {
  args: { size: 100 },
};

export const Settings: Story = {
  args: { size: 24, showSetting: true },
};
