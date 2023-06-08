import truncate from 'lodash.truncate';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Category, CategoryType, ItemCategory } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { DEFAULT_LANG, LIBRARY } from '@graasp/translations';

import {
  CATEGORY_TYPES,
  ITEM_TYPES,
  MAX_COLLECTION_NAME_LENGTH,
} from '../../config/constants';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import ItemBreadcrumb from './ItemBreadcrumb';
import Items from './Items';
import SummaryDetails from './SummaryDetails';
import SummaryHeader from './SummaryHeader';

// TODO: To be removed / moved to SDK.
export const getParentsIdsFromPath = (
  path?: string,
  { ignoreSelf = false } = {},
) => {
  if (!path) {
    return [];
  }

  let p = path;
  // ignore self item in path
  if (ignoreSelf) {
    // split path in half parents / self
    // eslint-disable-next-line no-useless-escape
    const els = path.split(/\.[^\.]*$/);
    // if els has only one element, the item has no parent
    if (els.length <= 1) {
      return [];
    }
    [p] = els;
  }
  const ids = p.replace(/_/g, '-').split('.');
  return ids;
};

type SummaryProps = {
  collection?: ItemRecord;
  likes?: number;
  isLoading: boolean;
  views?: number;
};

const Summary: React.FC<SummaryProps> = ({
  collection,
  likes = 0,
  views = 0,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: member } = hooks.useCurrentMember();
  const { data: categories } = hooks.useCategories();
  const { data: categoryTypes } = hooks.useCategoryTypes();

  const parents = getParentsIdsFromPath(collection?.path);
  const { data: topLevelParent } = hooks.useItem(parents[0] ?? collection?.id);
  const { data: itemCategories } = hooks.useItemCategories(
    topLevelParent?.id ?? collection?.id,
  );

  const tags = collection?.settings?.tags as any;

  const selectedCategories = categories
    ?.filter((category: Category) =>
      itemCategories
        ?.map((entry: ItemCategory) => entry.categoryId)
        ?.includes(category.id),
    )
    ?.groupBy((entry: Category) => entry.type);

  const levels = selectedCategories?.get(
    categoryTypes?.find(
      (ctype: CategoryType) => ctype.name === CATEGORY_TYPES.LEVEL,
    )?.id ?? '',
  );
  const disciplines = selectedCategories
    ?.get(
      categoryTypes?.find(
        (ctype: CategoryType) => ctype.name === CATEGORY_TYPES.DISCIPLINE,
      )?.id ?? '',
    )
    ?.sort(compare);
  const languages = selectedCategories?.get(
    categoryTypes?.find(
      (ctype: CategoryType) => ctype.name === CATEGORY_TYPES.LANGUAGE,
    )?.id ?? '',
  );

  // todo: remove cast after refactor
  const ccLicenseAdaption = (
    topLevelParent
      ? topLevelParent.settings?.ccLicenseAdaption
      : collection?.settings?.ccLicenseAdaption
  ) as string;

  const truncatedName = truncate(collection?.name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  return (
    <div>
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <ItemBreadcrumb itemId={collection?.id} />
      </Container>
      <SummaryHeader
        collection={collection}
        isLogged={member?.id !== undefined}
        isLoading={isLoading}
        likes={likes}
        tags={tags}
        truncatedName={truncatedName}
        views={views}
      />
      {collection?.type === ITEM_TYPES.FOLDER && (
        <>
          <Box sx={{ my: 4 }} />
          <Container maxWidth="lg">
            <Items
              parentId={collection?.id}
              lang={member?.extra?.lang}
              isTopLevel={collection?.path.indexOf('.') < 0}
            />
          </Container>
        </>
      )}
      <Box sx={{ my: 6 }} />
      <Container maxWidth="lg">
        <Typography variant="h6" fontWeight="bold">
          {t(LIBRARY.SUMMARY_DETAILS_TITLE)}
        </Typography>
        <SummaryDetails
          ccLicenseAdaption={ccLicenseAdaption}
          createdAt={collection?.createdAt}
          lastUpdate={collection?.updatedAt}
          isLoading={isLoading}
          lang={member?.extra?.lang || DEFAULT_LANG}
          disciplines={disciplines}
          languages={languages}
          levels={levels}
        />
      </Container>
    </div>
  );
};

export default Summary;
