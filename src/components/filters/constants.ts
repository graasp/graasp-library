export const queryParamsToCategory = {
  levels: 'level',
  disciplines: 'discipline',
  resourceTypes: 'resource-type',
} as const;

export const categoryToQueryParams = {
  level: 'levels',
  discipline: 'disciplines',
  'resource-type': 'resourceTypes',
} as const;
