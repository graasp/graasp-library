import { ItemType, MimeTypes } from '@graasp/sdk';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ItemIcon } from './ItemIcon.js';

const meta: Meta<typeof ItemIcon> = {
  title: 'Icons/ItemIcon',
  component: ItemIcon,

  argTypes: {
    type: {
      control: 'radio',
      options: [...Object.values(ItemType), 'upload'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ItemIcon>;

export const Folder: Story = {
  args: {
    type: ItemType.FOLDER,
  },
};

export const Default: Story = {
  args: {
    type: ItemType.FOLDER,
  },
};

export const ImageWithStyle: Story = {
  args: {
    type: ItemType.FOLDER,
    size: '100px',
  },
};

export const Image: Story = {
  args: {
    type: ItemType.FILE,
    mimetype: MimeTypes.Image.JPEG,
  },
};

export const Video: Story = {
  args: {
    type: ItemType.FILE,
    mimetype: MimeTypes.Video.MP4,
  },
};

export const Audio: Story = {
  args: {
    type: ItemType.FILE,
    mimetype: MimeTypes.Audio.MP3,
  },
};

export const PDF: Story = {
  args: {
    type: ItemType.FILE,
    mimetype: MimeTypes.PDF,
  },
};

export const ZIP: Story = {
  args: {
    type: ItemType.FILE,
    mimetype: MimeTypes.ZIP,
  },
};

export const App: Story = {
  args: {
    type: ItemType.APP,
  },
};

export const H5P: Story = {
  name: 'H5P',
  args: {
    type: ItemType.H5P,
  },
};

export const Link: Story = {
  args: {
    type: ItemType.LINK,
  },
};

export const Shortcut: Story = {
  args: {
    type: ItemType.SHORTCUT,
  },
};

export const EtherPad: Story = {
  args: {
    type: ItemType.ETHERPAD,
  },
};

export const FancyImage: Story = {
  args: {
    type: ItemType.FILE,
    color: 'red',
    size: '3rem',
    mimetype: MimeTypes.Image.JPEG,
  },
};
