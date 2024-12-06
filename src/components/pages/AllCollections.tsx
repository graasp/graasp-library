'use client';

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import { Close } from '@mui/icons-material';
import {
  Alert,
  Box,
  Container,
  IconButton,
  Button as MuiButton,
  Stack,
  Typography,
} from '@mui/material';

import { Button } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import {
  ALL_COLLECTIONS_GRID_ID,
  SEARCH_ERROR_MESSAGE_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { ItemOrSearchedItem } from '../../utils/types';
import { QueryClientContext } from '../QueryClientContext';
import CollectionsGrid from '../collection/CollectionsGrid';
import FilterHeader from '../filters/FilterHeader';
import MainWrapper from '../layout/MainWrapper';
import {
  SearchFiltersProvider,
  useSearchFiltersContext,
} from './SearchFiltersContext';

const AllCollectionsContent = (): ReactNode => {
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);

  const {
    tags,
    searchKeywords,
    shouldIncludeContent,
    setSearchKeywords,
    setShouldIncludeContent,
    langsForFilter,
  } = useSearchFiltersContext();

  const [prevResults, setPrevResults] = useState<ItemOrSearchedItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data: collections,
    isLoading,
    error,
  } = hooks.useSearchPublishedItems({
    query: searchKeywords,
    tags,
    langs: langsForFilter,
    page,
    // does not show children if option is disabled
    isPublishedRoot: !shouldIncludeContent,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // reset on query changes
  useEffect(() => {
    setPrevResults([]);
    setPage(1);
  }, [searchKeywords, tags, shouldIncludeContent]);

  const allCollections = prevResults.concat(
    collections?.results?.[0]?.hits ?? [],
  );

  const hitsNumber =
    collections?.results?.[0]?.totalHits ??
    collections?.results?.[0]?.estimatedTotalHits;

  return (
    <MainWrapper>
      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <Box py={5}>
          <FilterHeader
            isLoadingResults={false}
            // facetDistribution={collections?.results?.[0]?.facetDistribution}
          />
        </Box>
        <Stack flexGrow={2} direction="column" spacing={2}>
          {searchKeywords && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography color="#999">
                <Trans
                  values={{
                    search: searchKeywords,
                    count: hitsNumber ?? 0,
                  }}
                  t={t}
                  i18nKey={LIBRARY.SEARCH_RESULTS_FOR_TEXT}
                />
              </Typography>
              <IconButton onClick={() => setSearchKeywords('')}>
                <Close />
              </IconButton>
            </Stack>
          )}
          {error ? (
            <Alert severity="error" id={SEARCH_ERROR_MESSAGE_ID}>
              {t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}
            </Alert>
          ) : (
            <CollectionsGrid
              containerWidth="xl"
              collections={allCollections}
              id={ALL_COLLECTIONS_GRID_ID}
              isLoading={isLoading}
              showIsContentTag
            />
          )}
        </Stack>
        <Box my={10} textAlign="center">
          {Boolean((hitsNumber ?? 0) > allCollections.length) && (
            <Button
              onClick={() => {
                setPrevResults(allCollections);
                setPage(page + 1);
              }}
            >
              {t(LIBRARY.SEARCH_RESULTS_LOAD_MORE)}
            </Button>
          )}
          {!shouldIncludeContent && Boolean(searchKeywords) && (
            <MuiButton
              disableElevation
              onClick={() => {
                setShouldIncludeContent(true);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
              sx={{
                textTransform: 'none',
                paddingLeft: 5,
                paddingRight: 5,
                background: '#eee',
              }}
            >
              <Trans
                t={t}
                i18nKey={LIBRARY.SUGGESTION_TO_ENABLE_IN_DEPTH_SEARCH_TEXT}
              />
            </MuiButton>
          )}
        </Box>
      </Container>
    </MainWrapper>
  );
};

// eslint-disable-next-line react/function-component-definition
export default () => (
  <SearchFiltersProvider>
    <AllCollectionsContent />
  </SearchFiltersProvider>
);
