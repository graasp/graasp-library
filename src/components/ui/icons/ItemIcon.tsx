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

import { StyledImage } from '../StyledImage.js';
import EtherpadIcon from './EtherpadIcon.js';
import H5PIcon from './H5PIcon.js';

const MAX_ICON_SIZE = '25px';

export type ItemIconProps = {
  alt: string;
  /**
   * item type
   */
  type: UnionOfConst<typeof ItemType>;
  /**
   * An HTML Color to use for the foreground of the icon
   */
  color?: string;
  mimetype?: string;
  iconSrc?: string;
  size?: string;
};

export function ItemIcon({
  color,
  mimetype,
  iconSrc,
  alt = '',
  size = MAX_ICON_SIZE,
  type,
}: Readonly<ItemIconProps>): JSX.Element {
  if (iconSrc) {
    return (
      <StyledImage
        sx={{
          // icons should be squared
          maxHeight: size,
          maxWidth: size,
          height: size,
          width: size,
          objectFit: 'cover',
          borderRadius: 1,
        }}
        alt={alt}
        src={iconSrc}
      />
    );
  }

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
      if (mimetype) {
        if (MimeTypes.isImage(mimetype)) {
          Icon = ImageIcon;
          break;
        }
        if (MimeTypes.isVideo(mimetype)) {
          Icon = ClapperboardIcon;
          break;
        }
        if (MimeTypes.isAudio(mimetype)) {
          Icon = Music2Icon;
          break;
        }
        if (MimeTypes.isPdf(mimetype)) {
          Icon = FileTextIcon;
          break;
        }
        if (MimeTypes.isZip(mimetype)) {
          Icon = FolderArchiveIcon;
          break;
        }
      }

      Icon = FileIcon;
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
