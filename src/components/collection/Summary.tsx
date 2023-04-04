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

type SummaryProps = {
  name: string;
  description: string;
  settings: {
    tags: Immutable.List<string>;
    ccLicenseAdaption: string;
  };
  creator: Immutable.Map<string, string>;
  likes: number;
  views: number;
  rating: {
    value: number;
    count: number;
  };
  isLoading: boolean;
  itemId: string;
  createdAt: string;
  lastUpdate: string;
  extra: {
    embeddedLink: {
      url: string;
    };
    app: {
      url: string;
    };
  };
  type: string;
  path: string;
};

const Summary: React.FC<SummaryProps> = ({
  itemId,
  name = '',
  creator = null,
  description,
  settings,
  likes = 0,
  views = 0,
  isLoading,
  createdAt,
  lastUpdate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rating = {
    count: 0,
    value: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extra,
  type,
  path,
}) => {
  const { t } = useTranslation();

  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const tags = settings?.tags;

  const { hooks } = useContext(QueryClientContext);
  
  const { data: parents } = hooks.useParents({
    id: itemId,
    path,
    enabled: true,
  });

  const topLevelParent = parents?.get(0);
  
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
