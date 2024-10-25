import React from 'react';

import { Category } from '@graasp/sdk';

import { useCategoriesTranslation } from '../../config/i18n';
import {
  buildSearchFilterCategoryId,
  buildSearchFilterPopperButtonId,
} from '../../config/selectors';
import { Filter, FilterProps } from './Filter';

type CategoryFilterProps = {
  category: string;
  title: string;
  options?: Category[];
  selectedOptionIds: FilterProps['selectedOptionIds'];
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
  selectedOptionIds,
  isLoading,
}: CategoryFilterProps) {
  const { t: translateCategories } = useCategoriesTranslation();

  return (
    <Filter
      id={buildSearchFilterCategoryId(category)}
      buttonId={buildSearchFilterPopperButtonId(category)}
      title={title}
      isLoading={isLoading}
      options={options?.map((c) => [c.id, translateCategories(c.name)])}
      selectedOptionIds={selectedOptionIds}
      onOptionChange={onOptionChange}
      onClearOptions={onClearOptions}
    />
  );
}
