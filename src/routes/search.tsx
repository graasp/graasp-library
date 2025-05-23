import React, { useState } from 'react';

import { Close } from '@mui/icons-material';
import {
  Alert,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { ButtonLink } from '~/components/common/links/ButtonLink';
import FilterHeader from '~/components/filters/FilterHeader';
import {
  CollectionContainer,
  CollectionItem,
} from '~/components/ui/CollectionItem';
import {
  ALL_COLLECTIONS_GRID_ID,
  SEARCH_ERROR_MESSAGE_ID,
} from '~/config/selectors';
import useDebounce from '~/hooks/useDebounce';
import { collectionSearchInfiniteOptions } from '~/openapi/client/@tanstack/react-query.gen';
import { m } from '~/paraglide/messages';
import { locales } from '~/paraglide/runtime';

const PAGE_SIZE = 3;

const schema = z.object({
  s: fallback(z.string().optional(), '').default(''),
  langs: fallback(z.array(z.enum(locales)).optional(), []).default([]),
  levels: fallback(z.array(z.string()).optional(), []).default([]),
  disciplines: fallback(z.array(z.string()).optional(), []).default([]),
  resourceTypes: fallback(z.array(z.string()).optional(), []).default([]),
  page: fallback(z.number().optional(), 1).default(1),
  rootOnly: fallback(z.boolean().optional(), true).default(true),
});

export const Route = createFileRoute('/search')({
  validateSearch: zodValidator(schema),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { rootOnly } = search;
  const navigate = Route.useNavigate();
  // local state to keep input fluid
  const [searchKeywords, setSearchKeywords] = useState(search.s);
  const debouncedSearch = useDebounce(searchKeywords, 500);
  const {
    data: collections,
    isFetching,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    ...collectionSearchInfiniteOptions({
      body: {
        query: debouncedSearch,
        tags: {
          level: search.levels,
          discipline: search.disciplines,
          'resource-type': search.resourceTypes,
        },
        langs: search.langs,
        page: search.page,
        isPublishedRoot: rootOnly,
        limit: PAGE_SIZE,
      },
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage && lastPage.hits.length < PAGE_SIZE
        ? undefined
        : pages.length + 1;
    },
    placeholderData: keepPreviousData,
  });

  const onChangeKeywords = (newSearch: string) => {
    setSearchKeywords(newSearch);
    navigate({ to: '/search', search: (prev) => ({ ...prev, s: newSearch }) });
  };

  const hitsNumber =
    collections?.pages[0]?.totalHits ??
    collections?.pages[0]?.estimatedTotalHits ??
    0;
  return (
    <Container maxWidth="xl" sx={{ mb: 5, py: 5 }}>
      <Stack gap={3}>
        <Typography component="h1" variant="h4" width="100%">
          {rootOnly
            ? m.SEARCH_PAGE_TITLE({ count: hitsNumber })
            : m.SEARCH_PAGE_TITLE_CONTENT({ count: hitsNumber })}
        </Typography>
        <FilterHeader
          searchKeywords={searchKeywords}
          onChangeKeywords={onChangeKeywords}
        />
      </Stack>
      <Stack flexGrow={2} direction="column" spacing={2}>
        {search.s && (
          <Stack direction="row" spacing={1} alignItems="center" height="1lh">
            {isFetching ? (
              <LinearProgress sx={{ width: '100%' }} />
            ) : (
              <>
                <Typography color="#999" width="100%">
                  {m.SEARCH_RESULTS_FOR_TEXT({
                    search: search.s,
                    count: hitsNumber ?? 0,
                  })}
                </Typography>
                <IconButton
                  onClick={
                    // clear search
                    () => onChangeKeywords('')
                  }
                >
                  <Close />
                </IconButton>
              </>
            )}
          </Stack>
        )}
        {error ? (
          <Alert severity="error" id={SEARCH_ERROR_MESSAGE_ID}>
            {m.UNEXPECTED_ERROR_MESSAGE()}
          </Alert>
        ) : (
          <CollectionContainer id={ALL_COLLECTIONS_GRID_ID}>
            {collections?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.hits.map((collection) => (
                  <CollectionItem key={collection.id} collection={collection} />
                ))}
              </React.Fragment>
            ))}
          </CollectionContainer>
        )}
      </Stack>
      <Stack my={10} textAlign="center" spacing={2}>
        {Boolean(
          (hitsNumber ?? 0) >
            collections?.pages.reduce((acc, r) => acc + r.hits.length, 0),
        ) && (
          <Button
            onClick={() => {
              navigate({
                to: '.',
                search: (prev) => ({ ...prev, page: prev.page + 1 }),
              });
            }}
            loading={isFetchingNextPage}
          >
            {m.SEARCH_RESULTS_LOAD_MORE()}
          </Button>
        )}
        {rootOnly && Boolean(search.s) && (
          <ButtonLink
            disableElevation
            from={Route.fullPath}
            search={(prev) => ({
              ...prev,
              // search inside content too
              rootOnly: false,
            })}
            sx={{
              textTransform: 'none',
              paddingLeft: 5,
              paddingRight: 5,
              background: '#eee',
            }}
          >
            {m.SUGGESTION_TO_ENABLE_IN_DEPTH_SEARCH_TEXT()}
          </ButtonLink>
        )}
      </Stack>
    </Container>
  );
}
