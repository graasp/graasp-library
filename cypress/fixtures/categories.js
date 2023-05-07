// we cannot use constants.ts because next/config is not loaded correctly in cypress
export const SAMPLE_CATEGORY_TYPES = [
  {
    id: '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91',
    name: 'level',
  },
  {
    id: 'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c',
    name: 'discipline',
  },
  {
    id: '34bf2823-480a-4dd7-9c0f-8b5bfbdec380',
    name: 'language',
  },
];

export const SAMPLE_CATEGORIES = [
  {
    id: 'e873d800-5647-442c-930d-2d677532846a',
    name: 'level-1',
    type: SAMPLE_CATEGORY_TYPES[0].id,
  },
  {
    id: '352ef74e-8893-4736-926e-214c17396ed3',
    name: 'discipline-1',
    type: SAMPLE_CATEGORY_TYPES[1].id,
  },
  {
    id: 'ba7f7e3d-dc75-4070-b892-381fbf4759d9',
    name: 'language-1',
    type: SAMPLE_CATEGORY_TYPES[2].id,
  },
];

export const CUSTOMIZED_TAGS = ['water', 'ice', 'temperature'];
