import React, { useContext, useState } from 'react';

import {
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import { Filter, FilterProps } from './Filter';

type CategoryFilterProps = {
  category: string;
  title: string;
  selectedOptions: FilterProps['selectedOptions'];
  onOptionChange: FilterProps['onOptionChange'];
  onClearOptions: () => void;
};

// eslint-disable-next-line react/function-component-definition
export function CategoryFilter({
  category,
  title,
  onOptionChange,
  onClearOptions,
  selectedOptions,
}: CategoryFilterProps) {
  const { hooks } = useContext(QueryClientContext);

  const [facetQuery, setFacetQuery] = useState<string>('');
  const { data: tags } = hooks.useSearchFacets({
    facetName: category,
    facetQuery,
  });

  return (
    <Filter
      search={facetQuery}
      setSearch={setFacetQuery}
      id={buildSearchFilterCategoryId(category)}
      buttonId={buildSearchFilterPopperButtonId(category)}
      title={title}
      options={tags?.facetHits?.map(({ value }) => value) ?? []}
      selectedOptions={selectedOptions}
      onOptionChange={onOptionChange}
      onClearOptions={onClearOptions}
    />
  );
}
