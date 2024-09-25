import { useContext } from 'react';

import { UUID } from '@graasp/sdk';

import { QueryClientContext } from '../components/QueryClientContext';
import { useCategoriesTranslation } from '../config/i18n';

// eslint-disable-next-line import/prefer-default-export
export const useCategoryNames = ({ categories }: { categories?: UUID[] }) => {
  const { t: translateCategories } = useCategoriesTranslation();
  const { hooks } = useContext(QueryClientContext);

  const { data: categoriesEntries, isLoading: isCategoriesLoading } =
    hooks.useCategories();

  return categories
    ?.map((cId) => {
      const category = categoriesEntries?.find((c) => c.id === cId);
      if (!category) {
        return false;
      }

      return translateCategories(category.name);
    })
    .filter(Boolean) as string[];
};
