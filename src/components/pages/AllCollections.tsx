import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Close } from '@mui/icons-material';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';

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
    if (query) {
      if (query[UrlSearch.KeywordSearch]) {
        const keywordSearch = query[UrlSearch.KeywordSearch];
        if (keywordSearch && !Array.isArray(keywordSearch)) {
          setSearchKeywords(keywordSearch);
        }
      }
      if (query[UrlSearch.CategorySearch]) {
        const categoryId = query[UrlSearch.CategorySearch];
        if (categoryId) {
          setFilters(Array.isArray(categoryId) ? categoryId : [categoryId]);
        }
      }
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

  const clearAllSearch = () => {
    setSearchKeywords('');
    // clear search query params
    const url = new URL(window.location.toString());
    url.searchParams.delete(UrlSearch.KeywordSearch);
    router.replace(url);
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
          <Box py={5}>
            <FilterHeader
              onFiltersChanged={onFiltersChanged}
              onChangeSearch={setSearchKeywords}
              onSearch={setSearchKeywords}
              searchPreset={searchKeywords}
              categoryPreset={filters}
              isLoadingResults={false}
            />
          </Box>
          <Stack flexGrow={2} direction="column" spacing={2}>
            {searchKeywords && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="#999">
                  {t(LIBRARY.SEARCH_RESULTS_FOR_TEXT, {
                    search: searchKeywords,
                  })}
                </Typography>
                <IconButton onClick={clearAllSearch}>
                  <Close />
                </IconButton>
              </Stack>
            )}
            <CollectionsGrid
              containerWidth="xl"
              collections={filteredCollections}
              id={ALL_COLLECTIONS_GRID_ID}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Main>
    </>
  );
};

export default AllCollections;
