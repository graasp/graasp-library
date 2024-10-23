import React from 'react';

import { Category } from '@graasp/sdk';

import { useCategoriesTranslation } from '../../config/i18n';
import { buildSearchFilterCategoryId } from '../../config/selectors';
import { Filter } from './Filter';

type FilterProps = {
  category: string;
  title: string;
  options?: Category[];
  // IDs of selected options.
  selectedOptions: string[];
  onOptionChange: (key: string, newValue: boolean) => void;
  onClearOptions: () => void;
  isLoading: boolean;
};

// eslint-disable-next-line react/function-component-definition
export function CategoryFilter({
  category,
  title,
  onOptionChange,
  onClearOptions,
  options,
  selectedOptions,
  isLoading,
}: FilterProps) {
  const { t: translateCategories } = useCategoriesTranslation();

  return (
    <Filter
      id={buildSearchFilterCategoryId(category)}
      title={title}
      isLoading={isLoading}
      options={options?.map((c) => [c.id, translateCategories(c.name)])}
      selectedOptions={selectedOptions}
      onOptionChange={onOptionChange}
      onClearOptions={onClearOptions}
    />
  );
}
