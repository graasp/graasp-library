import dynamic from 'next/dynamic';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Container } from '@mui/material';

import { Context } from '@graasp/sdk';
import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import { PUBLISHED_TAG_ID } from '../../config/env';
import { MENU_BUTTON_ID } from '../../config/selectors';
import {
  PLACEHOLDER_COLLECTIONS,
  filterErrorItems,
} from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import useHeader from '../layout/useHeader';
import FilterHeader from './FilterHeader';

const Main = dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
  ssr: false,
});

type AllCollectionsProps = {};

const AllCollections: React.FC<AllCollectionsProps> = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const { data: collections } = hooks.usePublicItemsWithTag(PUBLISHED_TAG_ID, {
    placeholderData: PLACEHOLDER_COLLECTIONS,
  });
  const collectionsWithoutErrors = filterErrorItems(collections);

  const { leftContent, rightContent } = useHeader();

  // Filters is unused for now.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState<string[]>([]);

  const onFilterChanged = (newFilters: string[]) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Seo
        title={t(LIBRARY.GRAASP_LIBRARY)}
        description={t(LIBRARY.GRAASP_LIBRARY_DESCRIPTION)}
        author={APP_AUTHOR}
      />
      {/* todo: allow main to get custom header */}
      <Main
        context={Context.LIBRARY}
        menuButtonId={MENU_BUTTON_ID}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Container maxWidth="xl">
          <Box py={10}>
            <FilterHeader onFiltersChanged={onFilterChanged} />
          </Box>
        </Container>

        <CollectionsGrid
          containerWidth="xl"
          collections={collectionsWithoutErrors}
          id="foobar"
          isLoading={false}
        />
      </Main>
    </>
  );
};

export default AllCollections;
