import { Category, CategoryType, ItemCategory } from '@graasp/sdk';

import React, { useContext } from 'react';

import { LIBRARY } from '@graasp/translations';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import {
  CATEGORY_TYPES,
  ITEM_TYPES,
  MAX_COLLECTION_NAME_LENGTH,
} from '../../config/constants';
import { compare } from '../../utils/helpers';
import { QueryClientContext } from '../QueryClientContext';
import Items from './Items';
import SummaryDetails from './SummaryDetails';
import SummaryHeader from './SummaryHeader';
import ItemBreadcrumb from './ItemBreadcrumb';

const truncate = require('lodash.truncate');

export const getParentsIdsFromPath = (
  path: string,
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
  // TODO: find the type of a collection
  collection: any;
  creator: Immutable.Map<string, string>;
  likes: number;
  isLoading: boolean;
};

const Summary: React.FC<SummaryProps> = ({ collection, likes = 0, isLoading, creator }) => {
  const { t } = useTranslation();

  const {
    id: itemId,
    name = '',
    description,
    settings,
    createdAt,
    updatedAt: lastUpdate,
    extra,
    type,
    path,
    views = 0,
  } = collection;

  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const tags = settings?.tags;

  const { hooks } = useContext(QueryClientContext);

  const parents = getParentsIdsFromPath(path);

  const { data: topLevelParent } = hooks.useItem(parents[0] ?? itemId);
  
  const { data: categoryTypes } = hooks.useCategoryTypes();
  const { data: itemCategories } = hooks.useItemCategories(topLevelParent?.id ?? itemId);
  const { data: categories } = hooks.useCategories();


  const selectedCategories = categories
    ?.filter((category: Category) =>
      itemCategories?.map((entry: ItemCategory) => entry.categoryId)?.includes(category.id),
    )
    ?.groupBy((entry: Category) => entry.type);

  const levels = selectedCategories?.get(
    categoryTypes?.find((ctype: CategoryType) => ctype.name === CATEGORY_TYPES.LEVEL)?.id ?? '',
  );
  const disciplines = selectedCategories
    ?.get(
      categoryTypes?.find((ctype: CategoryType) => ctype.name === CATEGORY_TYPES.DISCIPLINE)
        ?.id ?? '',
    )
    ?.sort(compare);
  const languages = selectedCategories?.get(
    categoryTypes?.find((ctype: CategoryType) => ctype.name === CATEGORY_TYPES.LANGUAGE)?.id ?? '',
  );

  const ccLicenseAdaption = topLevelParent ? topLevelParent.settings?.ccLicenseAdaption : settings?.ccLicenseAdaption;

  const { data: member } = hooks.useCurrentMember();

  return (
    <div>
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <ItemBreadcrumb itemId={itemId} />
      </Container>
      <SummaryHeader
        extra={extra}
        isLogged={member?.id !== undefined}
        creator={creator}
        description={description}
        isLoading={isLoading}
        itemId={itemId}
        likes={likes}
        name={name}
        tags={tags}
        truncatedName={truncatedName}
        views={views}
      />
      {type === ITEM_TYPES.FOLDER && (
        <>
          <Box sx={{ my: 4 }} />
          <Container maxWidth='lg'>
            <Items parentId={itemId} lang={member?.extra?.lang} />
          </Container>
        </>
      )}
      <Box sx={{ my: 6 }} />
      <Container maxWidth="lg">
        <Typography variant='h6' fontWeight='bold'>
          {t(LIBRARY.SUMMARY_DETAILS_TITLE)}
        </Typography>
        <SummaryDetails
          ccLicenseAdaption={ccLicenseAdaption}
          createdAt={createdAt}
          disciplines={disciplines}
          isLoading={isLoading}
          lang={member?.extra?.lang}
          languages={languages}
          lastUpdate={lastUpdate}
          levels={levels}
        />       
      </Container>
    </div>
  );
};

export default Summary;
