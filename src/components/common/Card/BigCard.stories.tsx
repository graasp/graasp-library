import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { v4 } from 'uuid';

import { BrowserRouter } from 'react-router-dom';

import { Chip, Grid2 } from '@mui/material';

import { ItemType } from '@graasp/sdk';

import { BigCard } from './BigCard';

const meta = {
  title: 'Common/BigCard',
  component: BigCard,

  args: {
    id: v4(),
    link: 'mylink',
  },

  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
  argTypes: {},
} satisfies Meta<typeof BigCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: 'my card title',
    tags: [
      '6th grade at school',
      'English',
      'Mathematics',
      'Taylor',
      'Biology',
      'French',
      'Good',
      'secondary',
      'dialogue',
      'exercice',
      'fun',
      'subject',
    ],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname',
      id: v4(),
      link: 'mylink',
      avatar: '/test-assets/small_photo.jpg',
    },
    link: '/link',
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // card link
    await expect(
      document.querySelector(`a[href="${args.link}"]`),
    ).toBeVisible();

    // tags
    args.tags!.forEach((t) => {
      expect(canvas.getByText(t as string)).toBeVisible();
    });

    // creator
    expect(canvas.getByText(args.creator!.name)).toBeVisible();

    // likes
    expect(canvas.getByText(args.likeCount!)).toBeVisible();

    // name, description
    expect(canvas.getByText(args.name)).toBeVisible();
    expect(canvas.getByText(args.description!)).toBeVisible();

    // img
    await expect(
      document.querySelector(`img[src="${args.image}"]`),
    ).toBeVisible();
  },
} satisfies Story;

export const LongTitleAndLiked = {
  args: {
    name: 'my card title that is very long because I want to show everything and have more lines',
    tags: ['6th grade at school', 'English', 'Mathematics', 'Taylor'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname Is Veryyyyyyy Looooong Too',
      id: v4(),
      link: 'mylink',
      avatar: '/test-assets/small_photo.jpg',
    },
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
} satisfies Story;

export const OneTag = {
  args: {
    name: 'my card title that is very long because I want to show everything and have more lines',
    tags: ['6th grade'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname',
      id: v4(),
      avatar: '/test-assets/small_photo.jpg',
      link: 'mylink',
    },
    contentOverImage: <Chip label="mylabel" sx={{ background: 'red' }} />,
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
} satisfies Story;

export const Empty = {
  args: {
    name: 'my card title',
    description: '',
    type: ItemType.DOCUMENT,
    creator: { name: 'member name', id: v4(), link: 'mylink' },
  },
  play: async () => {
    // no link
    await expect(document.querySelector('#storybook-root a')).toBeNull();
  },
} satisfies Story;

export const VeryLongTitle = {
  args: {
    description: '',
    name: 'my card title is very long and takes all the space, but we should still see the tags and it will be cut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt nisl risus, quis mattis ipsum dictum at. Ut ullamcorper rhoncus nisl eu porttitor. Vestibulum rutrum erat ipsum, id lacinia risus iaculis id. Ut eleifend porta libero ac auctor. Pellentesque dui nisl, egestas et imperdiet vel, tempor sed tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis quis turpis elementum, elementum orci eu, varius massa. In imperdiet est eget turpis accumsan bibendum. Proin gravida faucibus felis in tempor. Nullam vitae vulputate turpis.',
    type: ItemType.DOCUMENT,
    creator: { name: 'member name', id: v4(), link: 'mylink' },
    tags: [
      'my tag',
      'my second tag',
      'my tag',
      'my second tag',
      'my tag',
      'my second tag',
      'my tag',
      'my second tag',
      'my tag',
      'my second tag',
    ],
  },
  play: async () => {
    // no link
    await expect(document.querySelector('#storybook-root a')).toBeNull();
  },
} satisfies Story;

export const WithLink = {
  args: {
    name: 'my card title',
    type: ItemType.DOCUMENT,
    description: '',
  },
  play: async () => {
    // link exists
    await expect(document.querySelector('#storybook-root a')).toBeVisible();
  },
} satisfies Story;

export const WithinGrid = {
  args: {
    name: 'my card title',
    tags: ['6th grade at school', 'English', 'Mathematics', 'Taylor'],
    likeCount: 213,
    type: ItemType.DOCUMENT,
    image: '/test-assets/big_photo.jpg',
    creator: {
      name: 'Name Surname',
      id: v4(),
      link: 'mylink',
      avatar: '/test-assets/small_photo.jpg',
    },
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
  },
  render: (args) => {
    return (
      <Grid2 container spacing={1}>
        <Grid2 size={{ sm: 6, lg: 4 }}>
          <BigCard {...args} />
        </Grid2>
        <Grid2 size={{ sm: 6, lg: 4 }}>
          <BigCard {...args} />
        </Grid2>
        <Grid2 size={{ sm: 6, lg: 4 }}>
          <BigCard {...args} />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <BigCard {...args} />
        </Grid2>
      </Grid2>
    );
  },
} satisfies Story;
