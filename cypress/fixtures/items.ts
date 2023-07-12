import {
  FolderItemType,
  ItemTagType,
  ItemType,
  PermissionLevel,
} from '@graasp/sdk';

import { MockItem } from '../support/types';
import { SAMPLE_CATEGORIES } from './categories';
import { CURRENT_USER, MEMBERS } from './members';

export const DEFAULT_FOLDER_ITEM: FolderItemType = {
  id: '',
  name: 'parent public item',
  description: 'Some description',
  settings: {},
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
  createdAt: new Date(Date.parse('2023-02-27T18:20:09.732Z')),
  updatedAt: new Date(Date.parse('2023-02-28T18:20:09.732Z')),
  extra: { [ItemType.FOLDER]: { childrenOrder: [] } },
  creator: CURRENT_USER,
  type: ItemType.FOLDER,
};

export const PUBLISHED_ITEMS: MockItem[] = [
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
    name: 'parent of public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    createdAt: new Date(Date.parse('2023-02-27T18:20:09.732Z')),
    updatedAt: new Date(Date.parse('2023-02-28T18:20:09.732Z')),
    settings: {
      tags: ['one-tag', 'two-tag'],
      ccLicenseAdaption: 'CC BY-NC-ND',
      displayCoEditors: true,
    },
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    },
    tags: [
      {
        id: 'ecbfbd2a-5688-11eb-ae93-0242ac130002',
        type: ItemTagType.Public,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
      {
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.BOB,
      },
    ],
    categories: [
      {
        category: SAMPLE_CATEGORIES[1],
      },
      {
        category: SAMPLE_CATEGORIES[0],
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'bdf09f5a-5688-11eb-ae93-0242ac130004',
    name: 'child of public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004.bdf09f5a_5688_11eb_ae93_0242ac130004',
    createdAt: new Date(Date.parse('2023-02-27T18:20:09.732Z')),
    updatedAt: new Date(Date.parse('2023-02-28T18:20:09.732Z')),
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    },
    tags: [
      {
        id: 'ab6e9ab1-b1a2-4ba9-abc2-21d186ef7e84',
        type: ItemTagType.Public,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'bdf09f5a_5688_11eb_ae93_0242ac130004',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
    ],
    categories: [
      {
        category: SAMPLE_CATEGORIES[1],
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
    name: 'public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
    createdAt: new Date(Date.parse('2023-01-27T18:20:09.732Z')),
    updatedAt: new Date(Date.parse('2023-01-28T18:20:09.732Z')),
    publishedInfo: {
      isPublished: true,
      rootPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    },
    tags: [
      {
        id: '323606b8-b8ee-4573-b927-6342e3949d21',
        type: ItemTagType.Public,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Read,
        member: MEMBERS.BOB,
      },
    ],
    categories: [
      {
        category: SAMPLE_CATEGORIES[1],
      },
      {
        category: SAMPLE_CATEGORIES[0],
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'egafbd2a-5688-11eb-ae93-0242ac130002',
    name: 'independant item',
    path: 'egafbd2a_5688_11eb_ae93_0242ac130002',
    createdAt: new Date(Date.parse('2023-02-27T18:20:09.732Z')),
    updatedAt: new Date(Date.parse('2023-02-28T18:20:09.732Z')),
    publishedInfo: {
      isPublished: true,
      rootPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
    },
    tags: [
      {
        id: '26ccc4ff-addc-49aa-978b-60cfdf0d7b1a',
        type: ItemTagType.Public,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
    name: 'public item2',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
    publishedInfo: {
      isPublished: true,
      rootPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
    },
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130003',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
    ],
    categories: [
      {
        category: SAMPLE_CATEGORIES[2],
      },
    ],
    tags: [
      {
        id: '9c2f7831-327e-46de-ad26-23c0126f1177',
        type: ItemTagType.Public,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'ecafcc2c-5688-11eb-ae93-0242ac130002',
    name: 'Item Without Licence',
    path: 'ecafcc2c_5688_11eb_ae93_0242ac130002',
    createdAt: new Date(Date.parse('2023-02-27T18:20:09.732Z')),
    updatedAt: new Date(Date.parse('2023-02-28T18:20:09.732Z')),
    creator: MEMBERS.BOB,
    settings: {
      tags: ['one-tag', 'two-tag'],
      displayCoEditors: true,
    },
    tags: [],
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.BOB,
      },
    ],
    categories: [
      {
        category: SAMPLE_CATEGORIES[1],
      },
      {
        category: SAMPLE_CATEGORIES[0],
      },
    ],
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
    tags: [
      {
        id: 'ecbfbd23-5688-11eb-ae93-0242ac130002',
        type: ItemTagType.Public,
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
      {
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Read,
        member: MEMBERS.BOB,
      },
    ],
    categories: [
      {
        category: SAMPLE_CATEGORIES[0],
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
    tags: [
      {
        id: 'ecbfbd23-5688-11eb-ae93-0242ac130002',
        type: ItemTagType.Public,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
      {
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PermissionLevel.Read,
        member: MEMBERS.BOB,
      },
    ],
    categories: [{ category: SAMPLE_CATEGORIES[0] }],
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
    tags: [
      {
        id: 'bdf09f5d_5688_11eb_ae93_0242ac130344',
        type: ItemTagType.Public,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'bdf09f5d_5688_11eb_ae93_0242ac130004',
        permission: PermissionLevel.Admin,
        member: MEMBERS.ANNA,
      },
    ],
    categories: [{ category: SAMPLE_CATEGORIES[1] }],
  },
];

export const getNumberOfOwnPublishedItems = (memberId: string) =>
  PUBLISHED_ITEMS.filter(
    ({ path, creator }) => !path.includes('.') && creator?.id === memberId,
  ).length;
