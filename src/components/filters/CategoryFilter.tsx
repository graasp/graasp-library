import React, { useContext } from 'react';

import { TagCategory } from '@graasp/sdk';

import {
  buildSearchFilterPopperButtonId,
  buildSearchFilterTagCategoryId,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import { useSearchFiltersContext } from '../pages/SearchFiltersContext';
import { Filter } from './Filter';

type CategoryFilterProps = {
  category: TagCategory;
  title: string;
};

// eslint-disable-next-line react/function-component-definition
export function CategoryFilter({ category, title }: CategoryFilterProps) {
  const { hooks } = useContext(QueryClientContext);
  const {
    tags,
    langsForFilter,
    searchKeywords,
    isPublishedRoot,
    toggleTagByCategory,
    clearTagsByCategory,
  } = useSearchFiltersContext();

  // ignore current category to get facets
  // implement OR logic
  // eg. [biology, chemistry] means getting facets for "category" with other tags set to biology or chemistry
  const ignoreCurrentCategory = { ...tags };
  delete ignoreCurrentCategory[category];

  const { data: options } = hooks.useSearchFacets({
    facetName: category,
    query: searchKeywords,
    tags: ignoreCurrentCategory,
    langs: langsForFilter,
    isPublishedRoot,
  });

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
