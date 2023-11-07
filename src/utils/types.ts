import { DiscriminatedItem, IndexItem } from '@graasp/sdk';

export type ItemOrSearchedItem = (DiscriminatedItem | IndexItem) & {
  isPublishedRoot?: IndexItem['isPublishedRoot'];
};
