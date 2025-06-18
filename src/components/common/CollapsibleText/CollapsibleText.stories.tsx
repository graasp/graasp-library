import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { CollapsibleText } from './CollapsibleText';

const meta = {
  title: 'Common/CollapsibleText',
  component: CollapsibleText,
  args: {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, nibh eu dapibus dignissim, eros orci tristique ipsum, id interdum ex neque a dui. Quisque pretium aliquam dui, pulvinar venenatis sem consectetur non. Sed felis mi, viverra sit amet blandit sed, vestibulum eu purus. Nulla eget tellus sodales, Vivamus scelerisque, nibh eu dapibus dignissim, eros orci tristique ipsum, id interdum ex neque a dui. Quisque pretium aliquam dui, pulvinar venenatis sem consectetur non. Sed felis mi, viverra sit amet blandit sed, vestibulum eu purus. Nulla eget tellus sodales, volutpat nulla in, blandit tellus. Fusce congue vitae elit ac scelerisque. Maecenas fringilla ipsum in enim volutpat dignissim. Aenean convallis urna vel nibh semper faucibus. Nunc non pellentesque nibh. Sed tempor, erat sit amet volutpat placerat, metus quam auctor nunc, in consectetur orci dui quis ligula.',
    numberOfLinesToShow: 3,
  },
} satisfies Meta<typeof CollapsibleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed = {
  args: {
    collapsed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Lorem', { exact: false })).toBeVisible();

    await expect(
      canvas.getByText('Lorem', { exact: false }).offsetHeight,
    ).toBeLessThan(100);
  },
} satisfies Story;

export const Uncollapsed = {
  args: {
    collapsed: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Lorem', { exact: false })).toBeVisible();

    await expect(
      canvas.getByText('Lorem', { exact: false }).offsetHeight,
    ).toBeGreaterThan(100);
  },
} satisfies Story;
