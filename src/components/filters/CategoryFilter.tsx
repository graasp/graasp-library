import { getRouteApi } from '@tanstack/react-router';

import {
  buildSearchFilterPopperButtonId,
  buildSearchFilterTagCategoryId,
} from '../../config/selectors';
import { Filter } from './Filter';
import { queryParamsToCategory } from './constants';
import { useSearchFacets } from './useSearchFacets';

type CategoryFilterProps = {
  category: 'levels' | 'disciplines' | 'resourceTypes';
  title: string;
};

const SearchRoute = getRouteApi('/search');

export function CategoryFilter({
  category,
  title,
}: Readonly<CategoryFilterProps>) {
  const search = SearchRoute.useSearch();
  const { s, levels, disciplines, resourceTypes, rootOnly } = search;
  const navigate = SearchRoute.useNavigate();
  const { data: options } = useSearchFacets({
    facetName: queryParamsToCategory[category],
    keywordSearch: s,
    tags: {
      // we should not search over the selected category in order to have accurate facets for the current category
      level: category !== 'levels' ? levels : undefined,
      discipline: category !== 'disciplines' ? disciplines : undefined,
      'resource-type': category !== 'resourceTypes' ? resourceTypes : undefined,
    },
    isPublishedRoot: rootOnly,
  });

  const toggleCategory = (value: string, newSelected: boolean) => {
    navigate({
      from: '/search',
      search: (prev) => ({
        ...prev,
        [category]: newSelected
          ? [...prev[category], value]
          : prev[category].filter((c) => c !== value),
      }),
    });
  };

  const clearCategory = () => {
    navigate({
      from: '/search',
      search: (prev) => ({ ...prev, [category]: [] }),
    });
  };

  return (
    <Filter
      id={buildSearchFilterTagCategoryId(category)}
      buttonId={buildSearchFilterPopperButtonId(category)}
      title={title}
      options={options ?? {}}
      selectedOptions={search[category]}
      onOptionChange={toggleCategory}
      onClearOptions={clearCategory}
    />
  );
}
