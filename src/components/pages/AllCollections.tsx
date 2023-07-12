import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Container } from '@mui/material';

import { Context } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';
import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR, UrlSearch } from '../../config/constants';
import {
  ALL_COLLECTIONS_GRID_ID,
  MENU_BUTTON_ID,
} from '../../config/selectors';
import { filterErrorItems } from '../../utils/collections';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import FilterHeader from '../filters/FilterHeader';
import useHeader from '../layout/useHeader';

const Main = dynamic(() => import('@graasp/ui').then((mod) => mod.Main), {
  ssr: false,
});

type AllCollectionsProps = {};

const AllCollections: React.FC<AllCollectionsProps> = () => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);
  const router = useRouter();

  const [filters, setFilters] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState<string>('');
  const { data: collections, isLoading } = hooks.useAllPublishedItems({
    categoryIds: filters,
  });

  useEffect(() => {
    const { query } = router;
    if (query && query[UrlSearch.KeywordSearch]) {
      const keywordSearch = query[UrlSearch.KeywordSearch] as string;
      setSearchKeywords(keywordSearch);
    }
  }, []);

  const collectionsWithoutErrors = filterErrorItems<ItemRecord>(collections);

  const filteredCollections = collectionsWithoutErrors?.filter((c) => {
    if (searchKeywords) {
      return (
        c.name.toLowerCase().includes(searchKeywords.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchKeywords.toLowerCase())
      );
    }
    return true;
  });

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
            <FilterHeader
              onFiltersChanged={onFiltersChanged}
              onSearch={setSearchKeywords}
              searchPreset={searchKeywords}
              isLoadingResults={false}
            />
          </Box>
        </Container>

        <Box m={2} flexGrow={2}>
          <CollectionsGrid
            containerWidth="xl"
            collections={filteredCollections}
            id={ALL_COLLECTIONS_GRID_ID}
            isLoading={isLoading}
          />
        </Box>
      </Main>
    </>
  );
};

export default AllCollections;
