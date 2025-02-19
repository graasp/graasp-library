import { useContext } from 'react';

import { langs } from '@graasp/translations';

import {
  SEARCH_FILTER_LANG_ID,
  buildSearchFilterPopperButtonId,
} from '../../config/selectors';
import { QueryClientContext } from '../QueryClientContext';
import { useSearchFiltersContext } from '../pages/SearchFiltersContext';
import { Filter } from './Filter';

type LangFilterProps = {
  title: string;
};

export function LangFilter({ title }: LangFilterProps) {
  const {
    tags,
    langs: selectedOptions,
    toggleLang,
    clearLang,
    searchKeywords,
    isPublishedRoot,
  } = useSearchFiltersContext();

  const { hooks } = useContext(QueryClientContext);

  const { data: options, isFetching } = hooks.useSearchFacets({
    facetName: 'lang',
    query: searchKeywords,
    tags,
    isPublishedRoot,
  });

  // received langs contain slugs, eg: fr
  // transform from fr -> Français
  const langOptions = options
    ? Object.keys(options).reduce((acc, key) => {
        const k = key as `${keyof typeof langs}`;
        return {
          ...acc,
          ...{ [langs[k] || k]: options[k] },
        };
      }, {})
    : {};

  return (
    <Filter
      id={SEARCH_FILTER_LANG_ID}
      title={title}
      options={langOptions}
      selectedOptions={selectedOptions}
      onOptionChange={toggleLang}
      onClearOptions={clearLang}
      buttonId={buildSearchFilterPopperButtonId('lang')}
      isLoading={isFetching}
    />
  );
}
