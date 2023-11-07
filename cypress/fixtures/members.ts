import { CompleteMember, MemberType } from '@graasp/sdk';

import { MockMember } from '../support/types';

const GRAASPER_ID = Cypress.env('GRAASPER_ID');

export const MEMBERS: { [key: string]: MockMember } = {
  ANNA: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130002',
    name: 'anna',
    email: 'anna@email.com',
  },
  BOB: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
    name: 'bob',
    email: 'bob@email.com',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pedro_Luro_edit.jpg/210px-Pedro_Luro_edit.jpg',
  },
  CEDRIC: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130006',
    name: 'cedric',
    email: 'cedric@email.com',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Domesticated_goose_head%2C_Chaguaramal%2C_Venezuela.jpg/320px-Domesticated_goose_head%2C_Chaguaramal%2C_Venezuela.jpg',
  },
  DAVID: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130062',
    name: 'david',
    email: 'david@email.com',
  },
  EVAN: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130022',
    name: 'evan',
    email: 'evan@email.com',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Children_playing_on_the_beach.jpg/320px-Children_playing_on_the_beach.jpg',
  },
  FANNY: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130012',
    name: 'fanny',
    email: 'fanny@email.com',
  },
  GRAASPER: {
    id: GRAASPER_ID,
    name: 'graasper',
    email: 'graasper@email.com',
  },
};

export const COMPLETE_MEMBERS: {
  [key: string]: CompleteMember & { thumbnail?: string };
} = {
  ANNA: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130002',
    name: 'anna',
    email: 'anna@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    updatedAt: '2021-04-13 14:56:34.749946',
    type: MemberType.Individual,
    extra: {
      lang: 'fr',
    },
  },
  BOB: {
    id: 'ecafbd2a-5642-31fb-ae93-0242ac130004',
    name: 'bob',
    email: 'bob@email.com',
    createdAt: '2021-04-13 14:56:34.749946',
    updatedAt: '2021-04-13 14:56:34.749946',
    type: MemberType.Individual,
    extra: { lang: 'en' },
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Pedro_Luro_edit.jpg/210px-Pedro_Luro_edit.jpg',
  },
};

export const CURRENT_USER = COMPLETE_MEMBERS.ANNA;
