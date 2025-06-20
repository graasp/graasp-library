import type { JSX, ReactNode } from 'react';

import { ItemType, MimeTypes, UnionOfConst } from '@graasp/sdk';

import {
  AppWindowIcon,
  CableIcon,
  ClapperboardIcon,
  FileIcon,
  FileTextIcon,
  FolderArchiveIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  Music2Icon,
  TextIcon,
} from 'lucide-react';

import EtherpadIcon from './EtherpadIcon.js';
import H5PIcon from './H5PIcon.js';

const MAX_ICON_SIZE = '25px';

export type ItemIconProps = {
  /**
   * item type
   */
  type: UnionOfConst<typeof ItemType>;
  /**
   * An HTML Color to use for the foreground of the icon
   */
  color?: string;
  mimetype?: string;
  size?: string;
};

function getIconFromMimetype(mimetype: string | undefined) {
  if (mimetype) {
    if (MimeTypes.isImage(mimetype)) {
      return ImageIcon;
    }
    if (MimeTypes.isVideo(mimetype)) {
      return ClapperboardIcon;
    }
    if (MimeTypes.isAudio(mimetype)) {
      return Music2Icon;
    }
    if (MimeTypes.isPdf(mimetype)) {
      return FileTextIcon;
    }
    if (MimeTypes.isZip(mimetype)) {
      return FolderArchiveIcon;
    }
  }
  return FileIcon;
}

export function ItemIcon({
  color,
  mimetype,
  size = MAX_ICON_SIZE,
  type,
}: Readonly<ItemIconProps>): JSX.Element {
  let Icon: ({
    size,
    color,
  }: {
    size: string | number;
    color?: string;
  }) => JSX.Element | ReactNode = FileIcon;
  switch (type) {
    case ItemType.FOLDER:
      Icon = FolderIcon;
      break;
    case ItemType.SHORTCUT:
      Icon = CableIcon;
      break;
    case ItemType.DOCUMENT: {
      Icon = TextIcon;
      break;
    }
    case ItemType.FILE: {
      Icon = getIconFromMimetype(mimetype);
      break;
    }
    case ItemType.LINK: {
      Icon = LinkIcon;
      break;
    }
    case ItemType.APP: {
      Icon = AppWindowIcon;
      break;
    }
    case ItemType.H5P: {
      Icon = H5PIcon;
      break;
    }
    case ItemType.ETHERPAD: {
      Icon = EtherpadIcon;
      break;
    }
    default:
      break;
  }

  return <Icon color={color} size={size} />;
}
