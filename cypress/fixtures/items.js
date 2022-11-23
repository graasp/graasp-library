import { ITEM_TYPES, PERMISSION_LEVELS } from '../support/constants';
import { SAMPLE_CATEGORIES } from './categories';
import { ITEM_PUBLIC_TAG, ITEM_PUBLISHED_TAG } from './itemTags';
import { CURRENT_USER, MEMBERS } from './members';

export const DEFAULT_FOLDER_ITEM = {
  extra: {},
  creator: CURRENT_USER.id,
  type: ITEM_TYPES.FOLDER,
};

export const CREATED_ITEM = {
  name: 'created item',
  type: ITEM_TYPES.FOLDER,
  extra: {
    image: 'someimageurl',
  },
};

export const PUBLISHED_ITEMS = [
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
    name: 'parent public item',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
    settings: {
      tags: ['one-tag', 'two-tag'],
      ccLicenseAdaption: 'allow',
      displayCoEditors: true,
    },
    tags: [
      {
        id: 'ecbfbd2a-5688-11eb-ae93-0242ac130002',
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
      {
        id: 'ecbfbd2a-5688-12eb-ae93-0242ac130002',
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.BOB.id,
      },
    ],
    categories: [
      {
        categoryId: SAMPLE_CATEGORIES[1].id,
      },
      {
        categoryId: SAMPLE_CATEGORIES[0].id,
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'bdf09f5a-5688-11eb-ae93-0242ac130004',
    name: 'child of public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004.bdf09f5a_5688_11eb_ae93_0242ac130004',
    tags: [
      {
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
      {
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemId: 'bdf09f5a-5688-11eb-ae93-0242ac130004',
        itemPath: 'bdf09f5a_5688_11eb_ae93_0242ac130004',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
    ],
    categories: [
      {
        categoryId: SAMPLE_CATEGORIES[1].id,
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
    name: 'public item1',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',

    tags: [
      {
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
      {
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
      {
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.READ,
        memberId: MEMBERS.BOB.id,
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'egafbd2a-5688-11eb-ae93-0242ac130002',
    name: 'independant item',
    path: 'egafbd2a_5688_11eb_ae93_0242ac130002',

    tags: [
      {
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
      {
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
    name: 'public item2',
    path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',

    memberships: [
      {
        itemId: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
        itemPath: 'fdf09f5a_5688_11eb_ae93_0242ac130003',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
    ],
    categories: [
      {
        categoryId: SAMPLE_CATEGORIES[2].id,
      },
    ],
    tags: [
      {
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
      {
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'egafbd2a_5688_11eb_ae93_0242ac130002',
      },
    ],
  },
];

export const GRAASPER_ITEMS = [
  {
    ...DEFAULT_FOLDER_ITEM,
    creator: MEMBERS.GRAASPER.id,
    id: 'edafbd2d-5688-11eb-ae93-0242ac130002',
    name: 'graasper public item',
    path: 'edafbd2d_5688_11eb_ae93_0242ac130002',
    tags: [
      {
        id: 'ecbfbd23-5688-11eb-ae93-0242ac130002',
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
      },
      {
        id: 'ecbfbd2a-5688-12eb-ae93-0242ac130002',
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
      {
        itemPath: 'edafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.READ,
        memberId: MEMBERS.BOB.id,
      },
    ],
    categories: [
      {
        categoryId: SAMPLE_CATEGORIES[0].id,
      },
    ],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    creator: MEMBERS.GRAASPER.id,
    id: 'ecafbd2d-5688-11eb-ae93-0242ac130002',
    name: 'graasper public item 2',
    path: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
    tags: [
      {
        id: 'ecbfbd23-5688-11eb-ae93-0242ac130002',
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
      {
        id: 'ecbfbd2a-5688-12eb-ae93-0242ac130002',
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
      {
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
        permission: PERMISSION_LEVELS.READ,
        memberId: MEMBERS.BOB.id,
      },
    ],
    categories: [{ categoryId: SAMPLE_CATEGORIES[0].id }],
  },
  {
    ...DEFAULT_FOLDER_ITEM,
    creator: MEMBERS.GRAASPER.id,
    id: 'bdf09f5d-5688-11eb-ae93-0242ac130004',
    name: 'child of public item1',
    path: 'ecafbd2d_5688_11eb_ae93_0242ac130002.bdf09f5d_5688_11eb_ae93_0242ac130004.bdf09f5a_5688_11eb_ae93_0242ac130004',
    tags: [
      {
        tagId: ITEM_PUBLISHED_TAG.id,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
      {
        tagId: ITEM_PUBLIC_TAG.id,
        itemPath: 'ecafbd2d_5688_11eb_ae93_0242ac130002',
      },
    ],
    memberships: [
      {
        itemId: 'bdf09f5a-5688-11eb-ae93-0242ac130004',
        itemPath: 'bdf09f5d_5688_11eb_ae93_0242ac130004',
        permission: PERMISSION_LEVELS.ADMIN,
        memberId: MEMBERS.ANNA.id,
      },
    ],
    categories: [{ categoryId: SAMPLE_CATEGORIES[1].id }],
  },
];

export const getNumberOfOwnPublishedItems = (memberId) =>
  PUBLISHED_ITEMS.filter(
    ({ path, creator }) => !path.includes('.') && creator === memberId,
  ).length;
