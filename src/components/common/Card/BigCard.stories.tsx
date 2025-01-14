import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { v4 } from 'uuid';

import { BrowserRouter } from 'react-router-dom';

import { Chip, Grid2 } from '@mui/material';

import { ItemType } from '@graasp/sdk';

import { BigCard } from './BigCard';

const LONG_NAME =
  'my card title is very long and takes all the space, but we should still see the tags and it will be cut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt nisl risus, quis mattis ipsum dictum at. Ut ullamcorper rhoncus nisl eu porttitor. Vestibulum rutrum erat ipsum, id lacinia risus iaculis id. Ut eleifend porta libero ac auctor. Pellentesque dui nisl, egestas et imperdiet vel, tempor sed tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis quis turpis elementum, elementum orci eu, varius massa. In imperdiet est eget turpis accumsan bibendum. Proin gravida faucibus felis in tempor. Nullam vitae vulputate turpis.';

const meta = {
  title: 'Common/BigCard',
  component: BigCard,

  args: {
    id: v4(),
    height: 230,
    link: '/card-link',
    image: '/test-assets/big_photo.jpg',
    likeCount: 213,
    type: ItemType.DOCUMENT,
    tags: ['6th grade at school', 'English', 'Mathematics', 'Taylor'],
    creator: {
      name: 'Name Surname',
      id: v4(),
      link: '/mylink',
      avatar: '/test-assets/small_photo.jpg',
    },
    description:
      'Tempor volutpat eget varius nisl cursus. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Fusce cras commodo adipiscing dictumst gravida pharetra velit. Enim cursus ultrices in natoque. Faucibus porttitor posuere consequat congue aliquam. Sapien tempus blandit massa rhoncus',
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
      'a longer tag',
      'title',
      'Neurology',
      'stars',
      'rabbit',
    ],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // card link
    await expect(
      document.querySelector(`a[href="${args.link}"]`),
    ).toBeVisible();

    // tags
    args.tags!.forEach((t) => {
      expect(canvas.getByText(t)).toBeVisible();
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
    creator: {
      name: 'Name Surname Is Veryyyyyyy Looooong Too',
      id: v4(),
      link: '/mylink',
      avatar: '/test-assets/small_photo.jpg',
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // tags
    args.tags!.forEach((t) => {
      expect(canvas.getByText(t)).toBeVisible();
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

export const ContentOverImage = {
  args: {
    name: 'content over image',
    contentOverImage: <Chip label="mylabel" sx={{ background: 'red' }} />,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // tags
    args.tags!.forEach((t) => {
      expect(canvas.getByText(t)).toBeVisible();
    });

    // creator
    expect(canvas.getByText(args.creator!.name)).toBeVisible();

    // likes
    expect(canvas.getByText(args.likeCount!)).toBeVisible();

    // name, description
    expect(canvas.getByText(args.name)).toBeVisible();
    expect(canvas.getByText(args.description!)).toBeVisible();

    expect(canvas.getByText('mylabel')).toBeVisible();

    // img
    await expect(
      document.querySelector(`img[src="${args.image}"]`),
    ).toBeVisible();
  },
} satisfies Story;

export const Empty = {
  args: {
    name: 'my card title',
    description: '',
    creator: null,
    image: undefined,
    likeCount: 0,
    tags: [],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // name
    expect(canvas.getByText(args.name)).toBeVisible();
  },
} satisfies Story;

export const NoCreator = {
  args: {
    name: 'my card title',
    creator: null,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // name
    expect(canvas.getByText(args.name)).toBeVisible();
  },
} satisfies Story;

export const NoAvatarForCreator = {
  args: {
    name: 'my card title',
    creator: { id: v4(), name: 'Bob', link: '/creator-mylink' },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // show first letter of creator name
    expect(canvas.getByTitle(`${args.creator!.name} avatar`)).toContainHTML(
      'B',
    );
  },
} satisfies Story;

export const VeryLongTitle = {
  args: {
    name: LONG_NAME,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // tags
    args.tags!.forEach((t) => {
      expect(canvas.getByText(t)).toBeVisible();
    });

    // creator
    expect(canvas.getByText(args.creator!.name)).toBeVisible();

    // name
    expect(canvas.getByText(args.name)).toBeVisible();
    // description is not visibile but exist in the dom
    expect(canvas.getByText(args.description!)).toBeVisible();
  },
} satisfies Story;

export const Mobile = {
  args: {
    name: LONG_NAME,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // tags
    args.tags!.forEach((t) => {
      expect(canvas.getByText(t)).toBeVisible();
    });

    // creator name is not displayed
    await expect(
      document.querySelector(`a[href="${args.creator!.link}"]`),
    ).not.toHaveTextContent(args.creator!.name);

    // card name
    expect(canvas.getByText(args.name)).toBeVisible();
    // description is not visibile but exist in the dom
    expect(canvas.getByText(args.description!)).toBeVisible();
  },
} satisfies Story;

export const WithinGrid = {
  args: {
    name: 'card',
  },
  render: (args) => {
    return (
      <Grid2 container spacing={1}>
        <Grid2 size={{ sm: 6, lg: 4 }}>
          <BigCard {...args} {...Empty.args} />
        </Grid2>
        <Grid2 size={{ sm: 6, lg: 4 }}>
          <BigCard {...args} {...Default.args} />
        </Grid2>
        <Grid2 size={{ sm: 6, lg: 4 }}>
          <BigCard {...args} {...NoCreator.args} />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <BigCard {...args} {...LongTitleAndLiked.args} />
        </Grid2>
      </Grid2>
    );
  },
} satisfies Story;
