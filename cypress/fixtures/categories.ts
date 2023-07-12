import { Category, CategoryType } from '@graasp/sdk';

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 'e873d800-5647-442c-930d-2d677532846a',
    name: 'level-1',
    type: CategoryType.Level,
  },
  {
    id: '352ef74e-8893-4736-926e-214c17396ed3',
    name: 'discipline-1',
    type: CategoryType.Discipline,
  },
  {
    id: 'ba7f7e3d-dc75-4070-b892-381fbf4759d9',
    name: 'language-1',
    type: CategoryType.Language,
  },
];

export const CUSTOMIZED_TAGS = ['water', 'ice', 'temperature'];
