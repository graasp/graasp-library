import {
  DiscriminatedItem,
  FolderItemFactory,
  FolderItemType,
  ItemType,
  ItemVisibilityType,
  PermissionLevel,
  TagFactory,
} from '@graasp/sdk';

import { MockItem } from '../support/types';
import { CURRENT_USER, MEMBERS } from './members';

export const DEFAULT_FOLDER_ITEM: FolderItemType = FolderItemFactory({
  name: 'parent public item',
  description: 'Some description',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
  createdAt: '2023-02-27T18:20:09.732Z',
  updatedAt: '2023-02-28T18:20:09.732Z',
  extra: { [ItemType.FOLDER]: {} },
  creator: CURRENT_USER,
  type: ItemType.FOLDER,
});

export const PUBLISHED_ITEMS: MockItem[] = [
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
    name: 'parent of public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    createdAt: '2023-02-27T18:20:09.732Z',
    updatedAt: '2023-02-28T18:20:09.732Z',
    settings: {
      ccLicenseAdaption: 'CC BY-NC-ND',
      displayCoEditors: true,
    },
    // info available only from meilisearch
    isPublishedRoot: true,
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: 'ecbfbd2a-5688-11eb-ae93-0242ac130002',
        type: ItemVisibilityType.Public,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
      {
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.BOB,
      },
    ],
    discipline: ['my discipline'],
    level: [],
    'resource-type': ['app'],
    tags: [TagFactory(), TagFactory()],
    likes: 1,
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'bdf09f5a-5688-11eb-ae93-0242ac130004',
    name: 'child of public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004.bdf09f5a_5688_11eb_ae93_0242ac130004',
    createdAt: '2023-02-27T18:20:09.732Z',
    updatedAt: '2023-02-28T18:20:09.732Z',
    // info available only from meilisearch
    isPublishedRoot: false,
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: 'ab6e9ab1-b1a2-4ba9-abc2-21d186ef7e84',
        type: ItemVisibilityType.Public,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'bdf09f5a_5688_11eb_ae93_0242ac130004',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
    ],
    discipline: [],
    level: ['level'],
    'resource-type': [],
    tags: [TagFactory()],
    likes: 2,
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
    name: 'public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
    createdAt: '2023-01-27T18:20:09.732Z',
    updatedAt: '2023-01-28T18:20:09.732Z',
    // info available only from meilisearch
    isPublishedRoot: false,
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: '323606b8-b8ee-4573-b927-6342e3949d21',
        type: ItemVisibilityType.Public,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Read,
        account: MEMBERS.BOB,
      },
    ],
    discipline: [],
    level: ['level'],
    'resource-type': ['app'],
    tags: [TagFactory(), TagFactory()],
    likes: 0,
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'egafbd2a-5688-11eb-ae93-0242ac130002',
    name: 'independant item',
    path: 'egafbd2a_5688_11eb_ae93_0242ac130002',
    createdAt: '2023-02-27T18:20:09.732Z',
    updatedAt: '2023-02-28T18:20:09.732Z',
    // info available only from meilisearch
    isPublishedRoot: true,
    publishedInfo: {
      isPublished: true,
      rootPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: '26ccc4ff-addc-49aa-978b-60cfdf0d7b1a',
        type: ItemVisibilityType.Public,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    discipline: [],
    level: [],
    'resource-type': [],
    likes: 10,
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
    name: 'public item2',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',

    // info available only from meilisearch
    isPublishedRoot: false,
    publishedInfo: {
      isPublished: true,
      rootPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
    },
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130003',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
    ],
    visibility: [
      {
        id: '9c2f7831-327e-46de-ad26-23c0126f1177',
        type: ItemVisibilityType.Public,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    discipline: [],
    level: [],
    'resource-type': [],
    likes: 1,
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'ecafcc2c-5688-11eb-ae93-0242ac130002',
    name: 'Item Without Licence',
    path: 'ecafcc2c_5688_11eb_ae93_0242ac130002',
    createdAt: '2023-02-27T18:20:09.732Z',
    updatedAt: '2023-02-28T18:20:09.732Z',
    creator: MEMBERS.BOB,
    settings: {
      displayCoEditors: true,
    },
    visibility: [],
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.BOB,
      },
    ],
    discipline: ['my discipline'],
    level: ['level'],
    'resource-type': [],
    tags: [TagFactory(), TagFactory()],
    likes: 0,
  },
];

export const GRAASPER_ITEMS: MockItem[] = [
  {
    ...DEFAULT_FOLDER_ITEM,
    creator: MEMBERS.GRAASPER,
    id: 'edafbd2d-5688-11eb-ae93-0242ac130002',
    name: 'graasper public item',
    path: 'edafbd2d_5688_11eb_ae93_0242ac130002',
    publishedInfo: {
      isPublished: true,
      rootPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: 'ecbfbd23-5688-11eb-ae93-0242ac130002',
        type: ItemVisibilityType.Public,
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
      {
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Read,
        account: MEMBERS.BOB,
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    creator: MEMBERS.GRAASPER,
    id: 'ecafbd2d-5688-11eb-ae93-0242ac130002',
    name: 'graasper public item 2',
    path: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: 'ecbfbd23-5688-11eb-ae93-0242ac130002',
        type: ItemVisibilityType.Public,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
      {
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Read,
        account: MEMBERS.BOB,
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    creator: MEMBERS.GRAASPER,
    id: 'bdf09f5d-5688-11eb-ae93-0242ac130004',
    name: 'child of public item1',
    path: 'ecafbd2d_5688_11eb_ae93_0242ac130002.bdf09f5a_5688_11eb_ae93_0242ac130004.bdf09f5d_5688_11eb_ae93_0242ac130004',
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
    },
    visibility: [
      {
        id: 'bdf09f5d_5688_11eb_ae93_0242ac130344',
        type: ItemVisibilityType.Public,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'bdf09f5d_5688_11eb_ae93_0242ac130004',
        permission: PermissionLevel.Admin,
        account: MEMBERS.ANNA,
      },
    ],
  },
];

export const getNumberOfOwnPublishedItems = (memberId: string) =>
  PUBLISHED_ITEMS.filter(
    ({ path, creator }) => !path.includes('.') && creator?.id === memberId,
  ).length;

export const builderMeilisearchResults = (items: DiscriminatedItem[]) => ({
  hits: items.map((i) => ({ ...i, _formatted: i })),
  totalHits: items.length,
  estimatedTotalHits: items.length,
});
