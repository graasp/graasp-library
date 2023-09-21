import { IndexItem } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';

export type ItemOrSearchedItem = (ItemRecord | IndexItem) & {
  isPublishedRoot?: IndexItem['isPublishedRoot'];
};
