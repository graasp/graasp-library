import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import React, { useContext, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { Context } from '@graasp/sdk';

import { APP_AUTHOR, UrlSearch } from '../../config/constants';
import { useLibraryTranslation } from '../../config/i18n';
import {
  ALL_COLLECTIONS_GRID_ID,
  MENU_BUTTON_ID,
} from '../../config/selectors';
import LIBRARY from '../../langs/constants';
import { MeiliSearchResults } from '../../utils/types';
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
  const { t } = useLibraryTranslation();
  const { hooks } = useContext(QueryClientContext);
  const router = useRouter();

  const [filters, setFilters] = useState<string[][]>([]);
  const [shouldIncludeContent, setShouldIncludeContent] =
    useState<boolean>(true);
  const [searchKeywords, setSearchKeywords] = useState<string>('');
  const { data: collections, isLoading } = hooks.useSearchPublishedItems({
    query: searchKeywords,
    categories: filters,
    // does not show children if option is disabled or if a no query search exists
    isPublishedRoot: !searchKeywords || !shouldIncludeContent,
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
        // todo: this only works when one category is given
        if (categoryId) {
          setFilters(Array.isArray(categoryId) ? [categoryId] : [[categoryId]]);
        }
      }
    }
  }, []);

  const { leftContent, rightContent } = useHeader();

  const onFiltersChanged = (newFilters: string[][]) => {
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
        <Container maxWidth="xl" sx={{ mb: 5 }}>
          <Box py={5}>
            <FilterHeader
              shouldIncludeContent={shouldIncludeContent}
              onFiltersChanged={onFiltersChanged}
              onChangeSearch={setSearchKeywords}
              onSearch={setSearchKeywords}
              searchPreset={searchKeywords}
              categoryPreset={filters}
              isLoadingResults={false}
              onIncludeContentChange={setShouldIncludeContent}
            />
          </Box>
          <Stack flexGrow={2} direction="column" spacing={2}>
            {searchKeywords && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="#999">
                  <Trans
                    values={{
                      search: searchKeywords,
                      count:
                        (collections as MeiliSearchResults)?.results?.first()
                          ?.estimatedTotalHits ?? 0,
                    }}
                    t={t}
                    i18nKey={LIBRARY.SEARCH_RESULTS_FOR_TEXT}
                  />
                </Typography>
                <IconButton onClick={clearAllSearch}>
                  <Close />
                </IconButton>
              </Stack>
            )}
            <CollectionsGrid
              containerWidth="xl"
              collections={(collections as any)?.results?.first()?.hits}
              id={ALL_COLLECTIONS_GRID_ID}
              isLoading={isLoading}
              showIsContentTag
            />
          </Stack>
          {!shouldIncludeContent && Boolean(searchKeywords) && (
            <Box my={10} textAlign="center">
              <Button
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
              </Button>
            </Box>
          )}
        </Container>
      </Main>
    </>
  );
};

export default AllCollections;
