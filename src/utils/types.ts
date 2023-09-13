import { Category, ItemType } from '@graasp/sdk';
import { ImmutableCast } from '@graasp/sdk/frontend';

type Hits = {
  name: string;
  description: string;
  content: string;
  id: string;
  type: ItemType;
  categories: Category['id'][];
  isPublishedRoot: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  _formatted: {
    name: string;
    description: string;
    content: string;
    id: string;
    type: ItemType;
    categories: Category['id'][];
    isPublishedRoot: boolean;
    isHidden: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type MeiliSearchResults = ImmutableCast<{
  results: { hits: Hits[]; estimatedTotalHits: number }[];
}>;
