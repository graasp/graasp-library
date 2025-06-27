import { useQuery } from '@tanstack/react-query';

import { useDebounce } from '~/hooks/useDebounce';
import { GetFacetsForNameData } from '~/openapi/client';
import { getFacetsForNameOptions } from '~/openapi/client/@tanstack/react-query.gen';

export const useSearchFacets = (
  args: {
    facetName: GetFacetsForNameData['query']['facetName'];
    keywordSearch: string;
  } & GetFacetsForNameData['body'],
) => {
  const { keywordSearch, facetName, ...restArgs } = args;
  const debouncedQuery = useDebounce(keywordSearch, 500);
  return useQuery(
    getFacetsForNameOptions({
      query: { facetName },
      body: { ...restArgs, query: debouncedQuery },
    }),
  );
};
