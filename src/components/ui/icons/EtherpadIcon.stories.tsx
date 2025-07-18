import type { Meta, StoryObj } from '@storybook/react-vite';

import EtherpadIcon from './EtherpadIcon.js';

const meta: Meta<typeof EtherpadIcon> = {
  title: 'Icons/Etherpad',
  component: EtherpadIcon,
};

export default meta;

type Story = StoryObj<typeof EtherpadIcon>;

export const Default: Story = {
  args: {},
};
