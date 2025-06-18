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
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { Button } from '@graasp/ui';

import { useLibraryTranslation } from '../../config/i18n';
import {
  ALL_COLLECTIONS_GRID_ID,
  ALL_COLLECTIONS_TITLE_ID,
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
    isPublishedRoot,
  } = useSearchFiltersContext();

  const [prevResults, setPrevResults] = useState<ItemOrSearchedItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const {
    data: collections,
    isLoading,
    isFetching,
    error,
  } = hooks.useSearchPublishedItems({
    query: searchKeywords,
    tags,
    langs: langsForFilter,
    page,
    isPublishedRoot,
    hitsPerPage: 24,
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

  const allCollections = prevResults.concat(collections?.hits ?? []);

  const hitsNumber = collections?.totalHits ?? collections?.estimatedTotalHits;

  const translationKey = isPublishedRoot
    ? LIBRARY.SEARCH_PAGE_TITLE
    : LIBRARY.SEARCH_PAGE_TITLE_CONTENT;

  return (
    <MainWrapper>
      <Container maxWidth="xl" sx={{ mb: 5, py: 5 }}>
        <Typography variant="h4" width="100%" id={ALL_COLLECTIONS_TITLE_ID}>
          {t(translationKey, { count: hitsNumber })}
        </Typography>
        <Box>
          <FilterHeader isLoadingResults={isLoading} />
        </Box>
        <Stack flexGrow={2} direction="column" spacing={2}>
          {searchKeywords && (
            <Stack direction="row" spacing={1} alignItems="center">
              <>
                <Typography color="#999" width="100%">
                  {isFetching ? (
                    <Skeleton width="100%" />
                  ) : (
                    <Trans
                      values={{
                        search: searchKeywords,
                        count: hitsNumber ?? 0,
                      }}
                      t={t}
                      i18nKey={LIBRARY.SEARCH_RESULTS_FOR_TEXT}
                    />
                  )}
                </Typography>
                <IconButton onClick={() => setSearchKeywords('')}>
                  <Close />
                </IconButton>
              </>
            </Stack>
          )}
          {error ? (
            <Alert severity="error" id={SEARCH_ERROR_MESSAGE_ID}>
              {t(LIBRARY.UNEXPECTED_ERROR_MESSAGE)}
            </Alert>
          ) : (
            <CollectionsGrid
              collections={allCollections}
              id={ALL_COLLECTIONS_GRID_ID}
              isLoading={isLoading}
              showIsContentTag
            />
          )}
        </Stack>
        <Stack my={10} textAlign="center" spacing={2}>
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
        </Stack>
      </Container>
    </MainWrapper>
  );
};

export default () => (
  <SearchFiltersProvider>
    <AllCollectionsContent />
  </SearchFiltersProvider>
);
