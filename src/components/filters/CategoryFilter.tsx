import { useContext } from 'react';

import { TagCategory } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import {
  buildSearchFilterPopperButtonId,
  buildSearchFilterTagCategoryId,
} from '../../config/selectors';
import { getFacetsForNameOptions } from '../../openapi/client/@tanstack/react-query.gen';
import { QueryClientContext } from '../QueryClientContext';
import { useSearchFiltersContext } from '../pages/SearchFiltersContext';
import { Filter } from './Filter';

type CategoryFilterProps = {
  category: TagCategory;
  title: string;
};

// eslint-disable-next-line react/function-component-definition
export function CategoryFilter({
  category,
  title,
}: Readonly<CategoryFilterProps>) {
  const {
    tags,
    langsForFilter,
    searchKeywords,
    isPublishedRoot,
    toggleTagByCategory,
    clearTagsByCategory,
  } = useSearchFiltersContext();
  const { hooks } = useContext(QueryClientContext);

  // ignore current category to get facets
  // implement OR logic
  // eg. [biology, chemistry] means getting facets for "category" with other tags set to biology or chemistry
  const ignoreCurrentCategory = { ...tags };
  delete ignoreCurrentCategory[category];
  const debouncedSearchKeywords = hooks.useDebounce(searchKeywords, 500);
  const { data: options } = useQuery(
    getFacetsForNameOptions({
      query: {
        facetName: category,
      },
      body: {
        query: debouncedSearchKeywords,
        tags: ignoreCurrentCategory,
        langs: langsForFilter,
        isPublishedRoot,
      },
    }),
  );

  return (
    <Filter
      id={buildSearchFilterTagCategoryId(category)}
      buttonId={buildSearchFilterPopperButtonId(category)}
      title={title}
      options={options ?? {}}
      selectedOptions={tags[category]}
      onOptionChange={toggleTagByCategory(category)}
      onClearOptions={() => clearTagsByCategory(category)}
    />
  );
}
