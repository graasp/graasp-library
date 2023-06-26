import dynamic from 'next/dynamic';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Container } from '@mui/material';

import { Context } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import {
  ALL_COLLECTIONS_GRID_ID,
  MENU_BUTTON_ID,
} from '../../config/selectors';
import { filterErrorItems } from '../../utils/collections';
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

  const [filters, setFilters] = useState<string[]>([]);
  const { data: collections, isLoading } = hooks.useAllPublishedItems({
    categoryIds: filters,
  });

  const collectionsWithoutErrors = filterErrorItems<ItemRecord>(collections);

  const { leftContent, rightContent } = useHeader();

  const onFiltersChanged = (newFilters: string[]) => {
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
        context={Context.Library}
        menuButtonId={MENU_BUTTON_ID}
        headerLeftContent={leftContent}
        headerRightContent={rightContent}
      >
        <Container maxWidth="xl">
          <Box py={10}>
            <FilterHeader onFiltersChanged={onFiltersChanged} />
          </Box>
        </Container>

        <Box m={2} id={ALL_COLLECTIONS_GRID_ID} flexGrow={2}>
          <CollectionsGrid
            containerWidth="xl"
            collections={collectionsWithoutErrors}
            id="foobar"
            isLoading={isLoading}
          />
        </Box>
      </Main>
    </>
  );
};

export default AllCollections;
