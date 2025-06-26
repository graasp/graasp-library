import { IndexItem } from '@graasp/sdk';

export type ItemOrSearchedItem = IndexItem & {
  isPublishedRoot?: IndexItem['isPublishedRoot'];
};
